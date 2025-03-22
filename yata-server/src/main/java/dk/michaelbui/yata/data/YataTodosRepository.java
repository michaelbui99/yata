package dk.michaelbui.yata.data;

import dk.michaelbui.yata.generated.tables.TodoTags;
import dk.michaelbui.yata.generated.tables.Todos;
import dk.michaelbui.yata.generated.tables.records.TodosRecord;
import dk.michaelbui.yata.model.Tag;
import dk.michaelbui.yata.model.Todo;
import io.quarkus.runtime.Startup;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import org.jooq.Record1;
import org.jooq.Result;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Startup
@Singleton
public class YataTodosRepository implements TodosRepository {
    private final DslProvider dslProvider;

    @Inject
    public YataTodosRepository(DslProvider dslProvider) {
        this.dslProvider = dslProvider;
    }

    @Override
    public Todo getById(int id) {
        TodosRecord todoRecord = dslProvider.getDsl()
                .selectFrom(Todos.TODOS)
                .where(Todos.TODOS.ID.eq(id))
                .fetchAny();

        if (todoRecord == null) {
            return null;
        }

        Todo todo = new Todo();
        todo.setTitle(todoRecord.getTitle());
        todo.setId(todoRecord.getId());
        todo.setCompleted(todoRecord.getCompleted());
        todo.setDescription(todoRecord.getDescription());
        todo.setTimeLogged(todoRecord.getTimeLogged());
        if (todoRecord.getCreationDate() != null && !todoRecord.getCreationDate().isBlank()) {
            todo.setCreationDate(OffsetDateTime.parse(todoRecord.getCreationDate()));
        }
        return todo;
    }

    @Override
    public List<Todo> getAll() {
        Result<TodosRecord> result = dslProvider
                .getDsl()
                .select(Todos.TODOS.ID, Todos.TODOS.TITLE, Todos.TODOS.COMPLETED)
                .from(Todos.TODOS)
                .fetchInto(Todos.TODOS);

        return result
                .stream()
                .filter(Objects::nonNull)
                .map(res -> {
                    Todo todo = new Todo();
                    todo.setId(res.getId());
                    todo.setCompleted(res.getCompleted());
                    todo.setTitle(res.getTitle());
                    return todo;
                })
                .toList();
    }

    @Override
    public Optional<Integer> create(Todo todo) {
        // NOTE: In case of exceptions, we want them to propagate up
        //       instead of just returning empty Optional.
        Record1<Integer> id = dslProvider.getDsl()
                .insertInto(
                        Todos.TODOS,
                        Todos.TODOS.TITLE,
                        Todos.TODOS.DESCRIPTION,
                        Todos.TODOS.CREATION_DATE,
                        Todos.TODOS.TIME_LOGGED
                )
                .values(todo.getTitle(), todo.getDescription(), todo.getCreationDate().toString(), todo.getTimeLogged())
                .returningResult(Todos.TODOS.ID)
                .fetchOne();

        if (id == null) {
            return Optional.empty();
        }

        for (Tag tag : todo.getTags()) {
            dslProvider
                    .getDsl()
                    .insertInto(TodoTags.TODO_TAGS, TodoTags.TODO_TAGS.TODO_ID, TodoTags.TODO_TAGS.TAG_NAME)
                    .values(id.value1(), tag.getName())
                    .execute();
        }

        return Optional.ofNullable(id.value1());
    }
}
