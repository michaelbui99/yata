package dk.michaelbui.yata.service;

import dk.michaelbui.yata.model.Todo;
import dk.michaelbui.yata.data.TodosRepository;
import io.quarkus.runtime.Startup;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

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
}
