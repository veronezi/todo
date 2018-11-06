package todo.api;

import javax.inject.Inject;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Path("/application")
public class ApiApplication {

    @Inject
    private ServiceDatasource ds;

    @DELETE
    public Response purge() {
        ds.purge();
        return Response.ok().build();
    }

    @GET
    public Response isAlive() {
        return Response.ok().build();
    }

}
