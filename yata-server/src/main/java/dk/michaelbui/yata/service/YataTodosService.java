package dk.michaelbui.yata.service;

import dk.michaelbui.yata.data.TagsRepository;
import dk.michaelbui.yata.model.Tag;
import dk.michaelbui.yata.model.Todo;
import dk.michaelbui.yata.data.TodosRepository;
import io.quarkus.runtime.Startup;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.*;
import java.util.stream.Collectors;

@Startup
@Singleton
public class YataTodosService implements TodosService {
    private final TodosRepository todosRepository;
    private final TagsRepository tagsRepository;

    @Inject
    public YataTodosService(TodosRepository todosRepository, TagsRepository tagsRepository) {
        this.todosRepository = todosRepository;
        this.tagsRepository = tagsRepository;
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

        Map<String, Tag> existingTags = this
                .tagsRepository
                .getAll()
                .stream()
                .collect(Collectors.toMap(Tag::getName, tag -> tag));

        todo.getTags()
                .stream()
                .filter(tag -> !existingTags.containsKey(tag.getName()))
                .forEach(tagsRepository::create);

        return this.todosRepository.create(todo);
    }
}
