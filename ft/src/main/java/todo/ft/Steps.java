package todo.ft;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.mashape.unirest.request.HttpRequestWithBody;
import cucumber.api.java8.En;
import io.cucumber.datatable.DataTable;
import lombok.extern.java.Log;
import lombok.val;
import lombok.var;
import org.assertj.core.api.Condition;
import org.json.JSONObject;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.regex.Pattern;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Fail.fail;

@Log
public class Steps implements En {
    private static final Map<String, Object> NOTEBOOK = new HashMap<>();
    private String userName = "jdoe";

    private String getEndpointUrl(String path) {
        return "http://" + ServiceGetter.SERVICES.getApiHost() + ":" + ServiceGetter.SERVICES.getApiPort() + path;
    }

    private String getAuthorization(String username) {
        val url = "http://" + ServiceGetter.SERVICES.getApiHost() + ":" + ServiceGetter.SERVICES.getApiPort() + "/api/login";
        val request = Unirest.post(url)
                .header("Content-Type", "application/json")
                .header("Cache-Control", "no-cache")
                .body("{\n\t\"username\": \"" + username + "\",\n\t\"password\": \"123456\"\n}");
        final HttpResponse<String> token;
        try {
            token = request.asString();
        } catch (UnirestException e) {
            throw new TestException(e);
        }
        if (token.getStatus() != 200) {
            throw new TestException(MessageFormat.format("Bad auth request -> {0}", token));
        }
        return MessageFormat.format("Bearer {0}", token.getBody());
    }

    private static String getFormattedPath(String originalPath, String jsonName) {
        val myJson = (JsonNode) NOTEBOOK.get(jsonName);
        val m = Pattern.compile("\\:[a-zA-Z0-9_]+").matcher(originalPath);
        val params = new ArrayList<String>();
        var path = originalPath;
        while (m.find()) {
            params.add(m.group());
        }
        log.info(MessageFormat.format("[params] {0}", params));
        for (String param : params) {
            path = path.replaceAll(param, String.valueOf(myJson.getObject().get(param.substring(1))));
        }
        log.info("[path formatted] " + originalPath + " > " + path);
        return path;
    }

    @SuppressWarnings("unchecked")
    public Steps() {

        Given("I set '(.+)' json '(.+)' text field to '(.+)'", (
                String jsonName,
                String jsonField,
                String text) -> {
            val myJson = (JsonNode) NOTEBOOK.get(jsonName);
            myJson.getObject().put(jsonField, text);
        });

        Given("I set '(.+)' json '(.+)' boolean field to '(.+)'", (
                String jsonName,
                String jsonField,
                String text) -> {
            val myJson = (JsonNode) NOTEBOOK.get(jsonName);
            myJson.getObject().put(jsonField, Boolean.valueOf(text));
        });

        Given("I '(.+)' '(.+)' json to '(.+)' and save the resulting json as '(.*)'", (
                String verbTxt,
                String jsonName,
                String url,
                String resultingJsonName) -> {
            final HttpRequestWithBody request;
            if ("POST".equals(verbTxt)) {
                request = Unirest.post(getEndpointUrl(url));
            } else if ("PUT".equals(verbTxt)) {
                request = Unirest.put(getEndpointUrl(url));
            } else {
                fail("Unexpected verb.");
                return;
            }
            val json = NOTEBOOK.get(jsonName).toString();
            log.info(MessageFormat.format("We will {0} this json -> ''{1}''", verbTxt, json));
            final HttpResponse<JsonNode> response;
            try {
                response = request
                        .header("Content-Type", "application/json")
                        .header("Authorization", getAuthorization(userName))
                        .body(json)
                        .asJson();
            } catch (UnirestException e) {
                throw new TestException(request.asString().getBody());
            }
            log.info(MessageFormat.format("We''ve got this response -> ''{0}''", response.getBody()));
            if (!"".equals(resultingJsonName)) {
                NOTEBOOK.put(resultingJsonName, response.getBody());
            }
        });

        Then("the '(.+)' json '(.+)' text field matches '(.+)'", (
                String jsonName,
                String fieldName,
                String regex) -> {
            val myJson = (JsonNode) NOTEBOOK.get(jsonName);
            val value = myJson.getObject().getString(fieldName);
            assertThat(value).matches(regex);
        });

        Then("the '(.+)' json '(.+)' field is equal to '(.+)' json '(.+)' field", (
                String jsonOneName,
                String jsonOneField,
                String jsonTwoName,
                String jsonTwoField) -> {
            val one = (JsonNode) NOTEBOOK.get(jsonOneName);
            val two = (JsonNode) NOTEBOOK.get(jsonTwoName);
            val valOne = one.getObject().get(jsonOneField);
            val valTwo = two.getObject().get(jsonTwoField);
            assertThat(valOne).isEqualTo(valTwo);
        });

        When("I execute 'GET' against '(.+)' and save the resulting json as '(.+)'", (
                String url,
                String listName) -> {
            val request = Unirest.get(getEndpointUrl(url))
                    .header("Cache-Control", "no-cache")
                    .header("Authorization", getAuthorization(userName));
            final HttpResponse<JsonNode> response;
            try {
                response = request.asJson();
            } catch (UnirestException e) {
                throw new TestException(request.asString().getBody());
            }
            NOTEBOOK.put(listName, response.getBody());
        });

        Then("'(.+)' list matches", (String listName, DataTable dt) -> {
            val list = ((JsonNode) NOTEBOOK.get(listName)).getArray();
            val expected = dt.asMaps();
            assertThat(list).hasSize(expected.size());
            for (int i = 0; i < expected.size(); i++) {
                val expectedItem = expected.get(i);
                val actual = (JSONObject) list.get(i);
                expectedItem.forEach((field, value) -> {
                    val actualValue = actual.get(field);
                    if (Objects.equals(actualValue == null ? null : String.valueOf(actualValue), value)) {
                        return;
                    }
                    assertThat(String.valueOf(actualValue == null ? "" : actualValue)).is(new Condition<String>() {
                        @Override
                        public boolean matches(String theActual) {
                            return Objects.equals(theActual, value) || theActual.matches(value);
                        }
                    });
                });
            }
        });

        Then("the '(.+)' text field of element '(\\d+)' of the '(.+)' list is equal to the '(.+)' json '(.+)' field", (
                String fieldName,
                Integer itemIndex,
                String listName,
                String jsonName,
                String jsonFieldName) -> {
            val list = ((JsonNode) NOTEBOOK.get(listName)).getArray();
            val element = (JSONObject) list.get(itemIndex);
            val fieldValue = element.get(fieldName);
            val json = (JsonNode) NOTEBOOK.get(jsonName);
            assertThat(fieldValue).isEqualTo(json.getObject().get(jsonFieldName));
        });

        Given("I create a json '(.+)' called '(.+)'", (String jsonBody, String jsonName) -> {
            NOTEBOOK.put(jsonName, new JsonNode(jsonBody));
        });

        Given("the database is empty", () -> {
            Unirest.delete(getEndpointUrl("/api/application"))
                    .header("Authorization", getAuthorization("admin"))
                    .asString();
        });

        Given("the system is live", () -> {
            HttpResponse<String> response = Unirest.get(getEndpointUrl("/api/application"))
                    .header("Cache-Control", "no-cache")
                    .asString();
            assertThat(response.getStatus()).isEqualTo(200);
        });

        Given("I execute 'GET' against '(.+)' with parameters from '(.+)' json and save the resulting json as '(.+)'", (
                String path,
                String noteBookEntryName,
                String newNotebookEntryName) -> {
            val request = Unirest.get(getEndpointUrl(getFormattedPath(path, noteBookEntryName)))
                    .header("Cache-Control", "no-cache")
                    .header("Authorization", getAuthorization(userName));
            final HttpResponse<JsonNode> response;
            try {
                response = request.asJson();
            } catch (UnirestException e) {
                throw new TestException(request.asString().getBody());
            }
            NOTEBOOK.put(newNotebookEntryName, response.getBody());
        });

        Then("'(.+)' field is equal to '(.+)' field", (String noteBookEntryA, String noteBookEntryB) -> {
            val aName = noteBookEntryA.split("\\.")[0];
            val aField = noteBookEntryA.split("\\.")[1];
            val bName = noteBookEntryB.split("\\.")[0];
            val bField = noteBookEntryB.split("\\.")[1];
            val a = (JsonNode) NOTEBOOK.get(aName);
            val b = (JsonNode) NOTEBOOK.get(bName);
            assertThat(a.getObject().get(aField)).isEqualTo(b.getObject().get(bField));
        });

        Given("I am the '(.*)' user", (String usr) -> userName = usr);
    }
}
