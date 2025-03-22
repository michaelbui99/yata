package dk.michaelbui.yata.service;

import dk.michaelbui.yata.model.Todo;
import dk.michaelbui.yata.data.TodosRepository;
import io.quarkus.runtime.Startup;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;

@Startup
@Singleton
public class YataTodosService implements TodosService {
    private final TodosRepository todosRepository;

    @Inject
    public YataTodosService(TodosRepository todosRepository) {
        this.todosRepository = todosRepository;
    }

    @Override
    public Optional<Todo> getById(int id) {
        return Optional.ofNullable(this.todosRepository.getById(id));
    }

    @Override
    public List<Todo> getAll() {
        return this.todosRepository.getAll();
    }

    @Override
    public Optional<Integer> create(Todo todo) {
        todo.setCreationDate(OffsetDateTime.now(ZoneOffset.UTC));
        todo.setTimeLogged(0);
        todo.setCompleted(false);

        // TODO: Fetch all tags and create the tags does not already exist.

        return this.todosRepository.create(todo);
    }
}
