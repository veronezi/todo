package todo.api;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.apache.commons.io.FileUtils;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.annotation.PostConstruct;
import javax.ejb.Lock;
import javax.ejb.LockType;
import javax.ejb.Singleton;
import javax.inject.Inject;
import java.io.File;
import java.net.URL;
import java.nio.charset.StandardCharsets;

@Slf4j
@Singleton
public class JWTPublicKey {

    @Inject
    @ConfigProperty(name = "JWT_AUTH_URI")
    private String jwtDns;

    @Inject
    @ConfigProperty(name = "JWT_PUBLIC_KEY_PATH")
    private String jwtPath;

    private String pem;

    @PostConstruct
    @SneakyThrows
    public void init() {
        val pubFile = File.createTempFile("todo_pubkey_", ".pub");
        FileUtils.copyURLToFile(new URL(this.jwtDns + this.jwtPath), pubFile);
        log.info("Loaded jwt public key file: {}", pubFile.getAbsolutePath());
        this.pem = FileUtils.readFileToString(pubFile, StandardCharsets.UTF_8)
                .replaceAll("-----BEGIN (.*)-----", "")
                .replaceAll("-----END (.*)----", "")
                .replaceAll("\\s", "");
    }

    @Lock(LockType.READ)
    public String getPem() {
        return this.pem;
    }

}
