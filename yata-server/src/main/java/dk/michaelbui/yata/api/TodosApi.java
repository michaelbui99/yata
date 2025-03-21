package dk.michaelbui.yata.api;

import dk.michaelbui.yata.api.dtos.ApiResponse;
import dk.michaelbui.yata.api.dtos.PartialTodo;
import dk.michaelbui.yata.model.Todo;
import dk.michaelbui.yata.service.TodosService;
import io.quarkus.runtime.Startup;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@Singleton
@Startup
@Path("api/v1/todos")
public class TodosApi {
    private static final Logger LOGGER = LoggerFactory.getLogger(TodosApi.class);

    private final TodosService todosService;

    @Inject
    public TodosApi(TodosService todosService) {
        this.todosService = todosService;
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getById(@PathParam("id") int id) {
        try {
            Optional<Todo> todo = todosService.getById(id);
            if (todo.isEmpty()) {
                return Response
                        .status(Response.Status.NOT_FOUND)
                        .entity(
                                ApiResponse
                                        .notFound()
                                        .error(String.format("Todo with id '%s' does not exist", id))
                                        .build()
                        )
                        .build();
            }
            return Response.ok(ApiResponse.ok(todo).build()).build();
        } catch (Exception e) {
            LOGGER.error("Failed to fetch todo with id '{}'", id, e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        try {
            List<PartialTodo> todos = this.todosService.getAll()
                    .stream()
                    .map(todo -> {
                        PartialTodo p = new PartialTodo();
                        p.setTitle(todo.getTitle());
                        p.setId(todo.getId());
                        p.setCompleted(todo.getCompleted());
                        return p;
                    })
                    .toList();
            return Response.ok(ApiResponse.ok(todos).build()).build();
        } catch (Exception e) {
            LOGGER.error("Failed to fetch all todos", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }
}
