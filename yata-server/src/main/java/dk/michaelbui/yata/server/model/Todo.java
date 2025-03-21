package dk.michaelbui.yata.server.model;

import java.time.OffsetDateTime;

public class Todo {
    private int id;
    private String title;
    private String description;
    private boolean completed;
    private int timeLogged;
    private OffsetDateTime creationDate;

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public int getTimeLogged() {
        return timeLogged;
    }

    public OffsetDateTime getCreationDate() {
        return creationDate;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public void setTimeLogged(int timeLogged) {
        this.timeLogged = timeLogged;
    }

    public void setCreationDate(OffsetDateTime creationDate) {
        this.creationDate = creationDate;
    }
}
