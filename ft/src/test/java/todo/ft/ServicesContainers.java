package todo.ft;

import org.apache.commons.io.FileUtils;
import org.testcontainers.containers.DockerComposeContainer;
import org.testcontainers.containers.wait.strategy.Wait;

import java.io.File;
import java.io.IOException;
import java.time.Duration;

public class ServicesContainers implements ServicesProvider {

    private static final Duration TIMEOUT = Duration.ofSeconds(120);

    private final DockerComposeContainer stack;

    public ServicesContainers() {
        if (Boolean.getBoolean("external_services")) {
            this.stack = null;
            return;
        }
        final File dcFile;
        try {
            dcFile = File.createTempFile("docker-compose", ".yaml");
            FileUtils.copyInputStreamToFile(ServicesContainers.class.getResourceAsStream("/dc-tests.yaml"), dcFile);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        this.stack = new DockerComposeContainer(dcFile)
                .withPull(false)
                .withExposedService(
                        "ui_1",
                        80,
                        Wait.forListeningPort().withStartupTimeout(TIMEOUT)
                )
                .withExposedService(
                        "api_1",
                        8080,
                        Wait.forListeningPort().withStartupTimeout(TIMEOUT)
                );
        this.stack.start();
    }

    @Override
    public String getApiHost() {
        return this.stack.getServiceHost("api_1", 8080);
    }

    @Override
    public Integer getApiPort() {
        return this.stack.getServicePort("api_1", 8080);
    }

    @Override
    public String getUiHost() {
        return this.stack.getServiceHost("ui_1", 80);
    }

    @Override
    public Integer getUiPort() {
        return this.stack.getServicePort("ui_1", 80);
    }

    @Override
    public boolean isHeadless() {
        return Boolean.getBoolean("headless");
    }
}
