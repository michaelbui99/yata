package dk.michaelbui.yata.service;

import dk.michaelbui.yata.model.Todo;

import java.util.List;
import java.util.Optional;

public interface TodosService {
    /**
     * Retrieve a single {@link Todo}
     *
     * @return Optional with {@link Todo} with id equal to {@code id}. If no {@link Todo} exists, then empty Optional.
     */
    Optional<Todo> getById(int id);

    /**
     * Retrieve all {@link Todo}s created. Only id, title and completed is retrieved for each {@link Todo}.
     *
     * @return all created {@link Todo}s
     */
    List<Todo> getAll();

    Optional<Integer> create(Todo todo);
}
