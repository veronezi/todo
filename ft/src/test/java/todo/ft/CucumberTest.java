package todo.ft;

import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;
import org.junit.AfterClass;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(plugin = {"pretty"}, strict = true)
public class CucumberTest {
    @AfterClass
    public static void closeBrowser() {
        Browser.getInstance().close();
    }
}
