package todo.ft;

import io.github.bonigarcia.wdm.WebDriverManager;
import lombok.val;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeDriverService;
import org.openqa.selenium.chrome.ChromeOptions;

import java.io.Closeable;
import java.util.ServiceLoader;

public class Browser implements Closeable {

    private WebDriver driver;
    private final Object lock = new Object();
    private static final ServicesProvider services;

    private static final Browser INSTANCE = new Browser();

    static {
        val loaded = ServiceLoader.load(ServicesProvider.class).iterator();
        services = loaded.next();
        WebDriverManager.chromedriver().version("74").setup();
    }

    private Browser() {
        // singleton
    }

    public static Browser getInstance() {
        return INSTANCE;
    }

    public WebDriver getDriver(boolean newBrowser) {
        synchronized (lock) {
            if (newBrowser) {
                this.close();
            }
            if (this.driver == null) {
                val chromeOptions = new ChromeOptions();
                if (services.isHeadless()) {
                    chromeOptions.addArguments(
                            "--headless",
                            "--window-size=1920,1080",
                            "--no-sandbox",
                            "--disable-gpu"
                    );
                }
                val service = new ChromeDriverService.Builder()
                        .withWhitelistedIps("")
                        .build();
                this.driver = new ChromeDriver(service, chromeOptions);
            }
        }
        return driver;
    }

    public WebDriver getDriver() {
        return getDriver(false);
    }

    @Override
    public synchronized void close() {
        if (this.driver != null) {
            this.driver.close();
        }
        this.driver = null;
    }
}
