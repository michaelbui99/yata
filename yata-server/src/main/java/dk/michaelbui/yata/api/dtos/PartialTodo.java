package dk.michaelbui.yata.api.dtos;

import dk.michaelbui.yata.model.Todo;

public class PartialTodo {
    private String title;
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

    public static PartialTodo fromTodo(Todo todo) {
        PartialTodo p = new PartialTodo();
        p.setId(todo.getId());
        p.setTitle(todo.getTitle());
        p.setCompleted(todo.getCompleted());
        return p;
    }
}
