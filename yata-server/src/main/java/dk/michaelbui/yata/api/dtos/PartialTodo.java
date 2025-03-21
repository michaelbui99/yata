package dk.michaelbui.yata.api.dtos;

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
}
