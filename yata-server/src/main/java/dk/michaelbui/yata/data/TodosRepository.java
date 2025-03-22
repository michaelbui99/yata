package dk.michaelbui.yata.data;

import dk.michaelbui.yata.model.Todo;

import java.util.List;
import java.util.Optional;

public interface TodosRepository {
    Todo getById(int id);
    List<Todo> getAll();
    Optional<Integer> create(Todo todo);
}
