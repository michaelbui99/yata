/*
 * This file is generated by jOOQ.
 */
package dk.michaelbui.yata.generated.tables.records;


import dk.michaelbui.yata.generated.tables.FolderTodos;

import org.jooq.Record2;
import org.jooq.impl.UpdatableRecordImpl;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes", "this-escape" })
public class FolderTodosRecord extends UpdatableRecordImpl<FolderTodosRecord> {

    private static final long serialVersionUID = 1L;

    /**
     * Setter for <code>folder_todos.folder_id</code>.
     */
    public void setFolderId(Integer value) {
        set(0, value);
    }

    /**
     * Getter for <code>folder_todos.folder_id</code>.
     */
    public Integer getFolderId() {
        return (Integer) get(0);
    }

    /**
     * Setter for <code>folder_todos.todo_id</code>.
     */
    public void setTodoId(Integer value) {
        set(1, value);
    }

    /**
     * Getter for <code>folder_todos.todo_id</code>.
     */
    public Integer getTodoId() {
        return (Integer) get(1);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    @Override
    public Record2<Integer, Integer> key() {
        return (Record2) super.key();
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached FolderTodosRecord
     */
    public FolderTodosRecord() {
        super(FolderTodos.FOLDER_TODOS);
    }

    /**
     * Create a detached, initialised FolderTodosRecord
     */
    public FolderTodosRecord(Integer folderId, Integer todoId) {
        super(FolderTodos.FOLDER_TODOS);

        setFolderId(folderId);
        setTodoId(todoId);
        resetTouchedOnNotNull();
    }
}
