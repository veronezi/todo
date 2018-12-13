package todo.ft;

import cucumber.api.java8.En;
import lombok.extern.java.Log;
import lombok.val;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;

import java.text.MessageFormat;
import java.util.concurrent.TimeUnit;

@Log
public class StepsBrowser implements En {

    private final Browser browser = Browser.getInstance();

    private String getEndpointUrl(String path) {
        return "http://" + ServiceGetter.SERVICES.getUiHost() + ":" + ServiceGetter.SERVICES.getUiPort() + path;
    }

    private void retry(Runnable runnable) {
        int i = 10;
        Throwable caught = null;
        while (i-- > 0) {
            try {
                runnable.run();
                caught = null;
                break;
            } catch (Throwable e) {
                caught = e;
                try {
                    TimeUnit.SECONDS.sleep(1);
                } catch (InterruptedException e1) {
                    // no-op
                }
            }
        }
        if (caught != null) {
            throw new TestException(caught);
        }
    }

    private void enterTextField(String text, final String labelText) {
        retry(() -> {
            WebElement field = browser.getDriver().findElements(By.cssSelector("div.field")).stream().filter(inputCandidate -> {
                // removing special characters with me.xuender.unidecode.Unidecode -> tx bud!
                val actual = me.xuender.unidecode.Unidecode.decode(inputCandidate.findElement(By.cssSelector("label")).getText());
                val result = labelText.equalsIgnoreCase(actual);
                log.info(MessageFormat.format("Found label ''{0}''; expected ''{1}'' -> equal? [{2}]", actual, labelText, result));
                return result;
            }).findFirst().orElseThrow(() -> new TestException("Field not found")).findElement(By.cssSelector("input"));
            field.sendKeys(text);
            field.sendKeys(Keys.RETURN);
        });
    }

    private void openPath(String path) {
        val target = getEndpointUrl(path);
        log.info(MessageFormat.format("Navigate to -> {0}", target));
        val driver = browser.getDriver();
        driver.navigate().to(target);
    }

    public StepsBrowser() {
        Given("I open a new browser window", (String path) -> {
            log.info("Open new window");
            browser.getDriver(true);
        });

        Given("I open the '(.*)' page", this::openPath);

        Given("I enter '(.*)' in the '(.*)' text field and press enter", this::enterTextField);

        Given("I open the '(.*)' page and I enter '(.*)' in the '(.*)' text field and press enter",
                (String path, String text, final String labelText) -> retry(() -> {
                    this.openPath(path);
                    this.enterTextField(text, labelText);
                })
        );

        Then("a list has at least one element with '(.+)' in it", (String text) -> retry(() -> browser.getDriver()
                .findElements(By.cssSelector(".list-entry")).stream().filter(inputCandidate ->
                        inputCandidate.findElements(By.cssSelector("span, p")).stream().anyMatch(span ->
                                text.equals(span.getText()))
                ).findFirst()
                .orElseThrow(() -> new TestException("List entry not found")))
        );

        Given("the browser is clean", () -> browser.getDriver(true));

        Given("I click '(.+)'", (String ariaLabel) -> retry(() -> browser.getDriver()
                .findElements(By.cssSelector("[aria-label]")).stream().filter(candidate ->
                        candidate.getAttribute("aria-label").equalsIgnoreCase(ariaLabel)
                )
                .findFirst()
                .orElseThrow(() -> new TestException("Item with aria-label='" + ariaLabel + "' not found"))
                .click())
        );

    }
}
