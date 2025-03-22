package dk.michaelbui.yata.api.todos;

import dk.michaelbui.yata.api.ApiResponse;
import dk.michaelbui.yata.api.todos.dtos.CreateTodoDto;
import dk.michaelbui.yata.api.todos.dtos.PartialTodoDto;
import dk.michaelbui.yata.exception.NotFoundException;
import dk.michaelbui.yata.model.Todo;
import dk.michaelbui.yata.service.TodosService;
import io.quarkus.runtime.Startup;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Singleton
@Startup
@Path("v1/todos")
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
            List<PartialTodoDto> todos = this.todosService.getAll()
                    .stream()
                    .map(PartialTodoDto::fromTodo)
                    .toList();
            return ApiResponse
                    .ok(todos)
                    .build()
                    .toResponse();
        } catch (Exception e) {
            LOGGER.error("Failed to fetch all todos", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createNew(CreateTodoDto dto) {
        Integer newTodoId = this.todosService.create(dto.toTodo()).orElseThrow(() -> new RuntimeException(String.format("Failed to create todo '%s'", dto.getTitle())));
        return ApiResponse
                .builder()
                .statusCode(Response.Status.CREATED.getStatusCode())
                .data(newTodoId)
                .build()
                .toResponse();
    }
}
