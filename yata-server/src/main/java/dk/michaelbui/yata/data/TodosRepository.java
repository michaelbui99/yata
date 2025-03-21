package dk.michaelbui.yata.data;

import dk.michaelbui.yata.model.Todo;

import java.util.List;

public interface TodosRepository {
    Todo getById(int id);
    List<Todo> getAll();
}
