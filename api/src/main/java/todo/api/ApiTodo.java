package todo.api;

import javax.inject.Inject;
import javax.ws.rs.*;
import java.util.List;
import java.util.stream.Collectors;

@Path("/todo")
@Produces("application/json")
public class ApiTodo {

    @Inject
    private ServiceDatasource ds;

    @Inject
    private ServiceTransformers transformers;

    @GET
    @Path("/")
    public List<DtoTodo> getTodos() {
        return ds.getAll(EntityTodo.class).stream().map(transformers.getTodoToDto())
                .sorted((f1, f2) -> Long.compare(f2.getCreatedAt(), f1.getCreatedAt()))
                .collect(Collectors.toList());
    }

    @GET
    @Path("/{id}")
    public DtoTodo getTodo(@PathParam("id") String id) {
        return transformers.getTodoToDto().apply(ds.find(EntityTodo.class, id));
    }

    @POST
    @Path("/")
    @Consumes("application/json")
    public DtoTodo createTodo(final DtoTodo todo) {
        return transformers.getTodoToDto().apply(ds.add(transformers.getTodoToEntity().apply(todo)));
    }

    @PUT
    @Path("/")
    @Consumes("application/json")
    public DtoTodo updateTodo(final DtoTodo todo) {
        return transformers.getTodoToDto().apply(ds.update(transformers.getTodoToEntity().apply(todo)));
    }

}
