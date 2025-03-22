package dk.michaelbui.yata.api.todos.dtos;

import dk.michaelbui.yata.model.Tag;
import dk.michaelbui.yata.model.Todo;

import java.util.List;

public class CreateTodoDto {
    private String title;
    private String description;
    private List<Tag> tags;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public Todo toTodo() {
        Todo todo = new Todo();
        todo.setTags(tags);
        todo.setTitle(title);
        todo.setDescription(description);
        return todo;
    }
}
