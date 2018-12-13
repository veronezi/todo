package todo.ft;

import cucumber.api.java8.En;
import org.apache.commons.lang3.StringUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

import static org.assertj.core.api.Fail.fail;

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
            Optional<WebElement> optField = browser.getDriver().findElements(By.cssSelector("div.field")).stream().filter(inputCandidate -> {
                // removing special characters with me.xuender.unidecode.Unidecode -> tx bud!
                final String actual = me.xuender.unidecode.Unidecode.decode(inputCandidate.findElement(By.cssSelector("label")).getText());
                final boolean result = labelText.equalsIgnoreCase(actual);
                System.out.println("Found label '" + actual + "'; expected '" + labelText + "' -> equal? [" + result + "]");
                return result;
            }).findFirst();
            WebElement field = optField.orElseThrow(() -> new RuntimeException("Field not found")).findElement(By.cssSelector("input"));
            field.sendKeys(text);
            field.sendKeys(Keys.RETURN);
        });
    }

    private void openPath(String path) {
        final String target = getEndpointUrl(path);
        System.out.println("Navigate to -> " + target);
        final WebDriver driver = browser.getDriver();
        driver.navigate().to(target);
    }

    public StepsBrowser() {
        Given("I open a new browser window", (String path) -> {
            System.out.println("Open new window");
            browser.getDriver(true);
        });

        Given("I open the '(.*)' page", this::openPath);

        Given("I enter '(.*)' in the '(.*)' text field and press enter", this::enterTextField);

        Given("I open the '(.*)' page and I enter '(.*)' in the '(.*)' text field and press enter", (String path, String text, final String labelText) -> retry(() -> {
            this.openPath(path);
            this.enterTextField(text, labelText);
        }));

        Then("a list has at least one element with '(.+)' in it", (String text) -> retry(() -> {
            Optional<WebElement> el = browser.getDriver()
                    .findElements(By.cssSelector(".list-entry")).stream().filter(inputCandidate ->
                            inputCandidate.findElements(By.cssSelector("span, p")).stream().anyMatch(span ->
                                    text.equals(span.getText()))
                    ).findFirst();
            if (!el.isPresent()) {
                fail("List entry not found");
            }
        }));

        Given("the browser is clean", () -> browser.getDriver(true));

        Given("I click '(.+)'", (String ariaLabel) -> retry(() -> {
            Optional<WebElement> el = browser.getDriver()
                    .findElements(By.cssSelector("[aria-label]")).stream().filter(candidate ->
                            candidate.getAttribute("aria-label").equalsIgnoreCase(ariaLabel)
                    ).findFirst();
            if (!el.isPresent()) {
                fail("Item with aria-label='" + ariaLabel + "' not found");
            }
            el.ifPresent(WebElement::click);
        }));

    }
}
