package dk.michaelbui.yata.server.service;

import dk.michaelbui.yata.server.model.Todo;

import java.util.List;
import java.util.Optional;

public interface TodoService {
    /**
     * Retrieve a single {@link Todo}
     *
     * @return Optional with {@link Todo} with id equal to {@code id}. If no {@link Todo} exists, then empty Optional.
     */
    Optional<Todo> getById(int id);

    /**
     * Retrieve all {@link Todo}s created.
     *
     * @return all created {@link Todo}s
     */
    List<Todo> getAll();
}
