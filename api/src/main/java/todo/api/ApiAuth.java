package todo.api;

import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Slf4j
@Path("/login")
@Produces("application/json")
public class ApiAuth {

    @Inject
    @ConfigProperty(name = "JWT_AUTH_URI")
    private String jwtDns;

    @Inject
    @ConfigProperty(name = "JWT_AUTH_PATH")
    private String jwtPath;

    @POST
    @Path("/")
    @Consumes("application/json")
    public Response login(final DtoCredentials credentials) {
        log.info("Authenticating {} user", credentials.getUsername());
        return ClientBuilder.newClient().target(jwtDns + jwtPath)
                .request(MediaType.APPLICATION_JSON)
                .post(Entity.json(credentials));
    }

}
