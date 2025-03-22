package dk.michaelbui.yata.api.todos.dtos;

import dk.michaelbui.yata.model.Todo;

public class PartialTodoDto {
    private String title;
    private String description;
    private int timeLogged;
    private boolean completed;
    private int id;

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public boolean isCompleted() {
        return completed;
    }

    public int getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getTimeLogged() {
        return timeLogged;
    }

    public void setTimeLogged(int timeLogged) {
        this.timeLogged = timeLogged;
    }

    public static PartialTodoDto fromTodo(Todo todo) {
        PartialTodoDto p = new PartialTodoDto();
        p.setId(todo.getId());
        p.setTitle(todo.getTitle());
        p.setCompleted(todo.getCompleted());
        p.setDescription(todo.getDescription());
        p.setTimeLogged(todo.getTimeLogged());
        return p;
    }
}
