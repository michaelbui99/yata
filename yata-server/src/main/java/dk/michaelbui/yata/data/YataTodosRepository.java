package dk.michaelbui.yata.data;

import dk.michaelbui.yata.generated.tables.Todos;
import dk.michaelbui.yata.generated.tables.records.TodosRecord;
import dk.michaelbui.yata.model.Todo;
import io.quarkus.runtime.Startup;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import org.jooq.Result;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Objects;

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
}
