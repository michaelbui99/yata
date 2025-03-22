package dk.michaelbui.yata.api;

import dk.michaelbui.yata.api.dtos.ApiResponse;
import dk.michaelbui.yata.api.dtos.PartialTodo;
import dk.michaelbui.yata.exception.NotFoundException;
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
        Todo todo = todosService
                .getById(id)
                .orElseThrow(
                        () -> new NotFoundException(String.format("Todo with id '%s' does not exist", id))
                );
        return ApiResponse
                .ok(todo)
                .build()
                .toResponse();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        try {
            List<PartialTodo> todos = this.todosService.getAll()
                    .stream()
                    .map(PartialTodo::fromTodo)
                    .toList();
            return Response.ok(ApiResponse.ok(todos).build()).build();
        } catch (Exception e) {
            LOGGER.error("Failed to fetch all todos", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }
}
