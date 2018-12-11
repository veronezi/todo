package todo.ft;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.mashape.unirest.request.GetRequest;
import com.mashape.unirest.request.HttpRequestWithBody;
import com.mashape.unirest.request.body.RequestBodyEntity;
import cucumber.api.java8.En;
import io.cucumber.datatable.DataTable;
import org.assertj.core.api.Condition;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Fail.fail;

public class Steps implements En {
    private static final Map<String, Object> NOTEBOOK = new HashMap<>();
    private static String userName = "jdoe";

    private String getEndpointUrl(String path) {
        return "http://" + ServiceGetter.SERVICES.getApiHost() + ":" + ServiceGetter.SERVICES.getApiPort() + path;
    }

    private String getAuthorization(String username) {
        final String url = "http://" + ServiceGetter.SERVICES.getApiHost() + ":" + ServiceGetter.SERVICES.getApiPort() + "/api/login";
        final RequestBodyEntity request = Unirest.post(url)
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
            throw new TestException("Bad auth request -> " + token);
        }
        return "Bearer " + token.getBody();
    }

    private static String getFormattedPath(String originalPath, String jsonName) {
        final JsonNode myJson = (JsonNode) NOTEBOOK.get(jsonName);
        final Matcher m = Pattern.compile("\\:[a-zA-Z0-9_]+").matcher(originalPath);
        final List<String> params = new ArrayList<>();
        String path = originalPath;
        while (m.find()) {
            params.add(m.group());
        }
        System.out.println("[params] " + params);
        for (String param : params) {
            path = path.replaceAll(param, String.valueOf(myJson.getObject().get(param.substring(1))));
        }
        System.out.println("[path formatted] " + originalPath + " > " + path);
        return path;
    }

    @SuppressWarnings("unchecked")
    public Steps() {

        Given("I set '(.+)' json '(.+)' text field to '(.+)'", (
                String jsonName,
                String jsonField,
                String text) -> {
            JsonNode myJson = (JsonNode) NOTEBOOK.get(jsonName);
            myJson.getObject().put(jsonField, text);
        });

        Given("I set '(.+)' json '(.+)' boolean field to '(.+)'", (
                String jsonName,
                String jsonField,
                String text) -> {
            JsonNode myJson = (JsonNode) NOTEBOOK.get(jsonName);
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
            final String json = NOTEBOOK.get(jsonName).toString();
            System.out.println("We will " + verbTxt + " this json -> '" + json + "'");
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
            System.out.println("We've got this response -> '" + response.getBody() + "'");
            if (!"".equals(resultingJsonName)) {
                NOTEBOOK.put(resultingJsonName, response.getBody());
            }
        });

        Then("the '(.+)' json '(.+)' text field matches '(.+)'", (
                String jsonName,
                String fieldName,
                String regex) -> {
            JsonNode myJson = (JsonNode) NOTEBOOK.get(jsonName);
            String value = myJson.getObject().getString(fieldName);
            assertThat(value).matches(regex);
        });

        Then("the '(.+)' json '(.+)' field is equal to '(.+)' json '(.+)' field", (
                String jsonOneName,
                String jsonOneField,
                String jsonTwoName,
                String jsonTwoField) -> {
            final JsonNode one = (JsonNode) NOTEBOOK.get(jsonOneName);
            final JsonNode two = (JsonNode) NOTEBOOK.get(jsonTwoName);
            final Object valOne = one.getObject().get(jsonOneField);
            final Object valTwo = two.getObject().get(jsonTwoField);
            assertThat(valOne).isEqualTo(valTwo);
        });

        When("I execute 'GET' against '(.+)' and save the resulting json as '(.+)'", (
                String url,
                String listName) -> {
            final GetRequest request = Unirest.get(getEndpointUrl(url))
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
            final JSONArray list = ((JsonNode) NOTEBOOK.get(listName)).getArray();
            final List<Map<String, String>> expected = dt.asMaps();
            assertThat(list).hasSize(expected.size());
            for (int i = 0; i < expected.size(); i++) {
                final Map<String, String> expectedItem = expected.get(i);
                final JSONObject actual = (JSONObject) list.get(i);
                expectedItem.forEach((field, value) -> {
                    final Object actualValue = actual.get(field);
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
            final JSONArray list = ((JsonNode) NOTEBOOK.get(listName)).getArray();
            final JSONObject element = (JSONObject) list.get(itemIndex);
            final Object fieldValue = element.get(fieldName);
            final JsonNode json = (JsonNode) NOTEBOOK.get(jsonName);
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
            final GetRequest request = Unirest.get(getEndpointUrl(getFormattedPath(path, noteBookEntryName)))
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
            final String aName = noteBookEntryA.split("\\.")[0];
            final String aField = noteBookEntryA.split("\\.")[1];
            final String bName = noteBookEntryB.split("\\.")[0];
            final String bField = noteBookEntryB.split("\\.")[1];
            final JsonNode a = (JsonNode) NOTEBOOK.get(aName);
            final JsonNode b = (JsonNode) NOTEBOOK.get(bName);
            assertThat(a.getObject().get(aField)).isEqualTo(b.getObject().get(bField));
        });

        Given("I am the '(.*)' user", (String usr) -> userName = usr);
    }
}
