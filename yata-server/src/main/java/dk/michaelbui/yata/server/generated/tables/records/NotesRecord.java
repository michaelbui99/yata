/*
 * This file is generated by jOOQ.
 */
package generated.tables.records;


import generated.tables.Notes;

import org.jooq.Record1;
import org.jooq.impl.UpdatableRecordImpl;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes", "this-escape" })
public class NotesRecord extends UpdatableRecordImpl<NotesRecord> {

    private static final long serialVersionUID = 1L;

    /**
     * Setter for <code>notes.id</code>.
     */
    public void setId(Integer value) {
        set(0, value);
    }

    /**
     * Getter for <code>notes.id</code>.
     */
    public Integer getId() {
        return (Integer) get(0);
    }

    /**
     * Setter for <code>notes.title</code>.
     */
    public void setTitle(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>notes.title</code>.
     */
    public String getTitle() {
        return (String) get(1);
    }

    /**
     * Setter for <code>notes.markdown_content</code>.
     */
    public void setMarkdownContent(String value) {
        set(2, value);
    }

    /**
     * Getter for <code>notes.markdown_content</code>.
     */
    public String getMarkdownContent() {
        return (String) get(2);
    }

    /**
     * Setter for <code>notes.todo_id</code>.
     */
    public void setTodoId(Integer value) {
        set(3, value);
    }

    /**
     * Getter for <code>notes.todo_id</code>.
     */
    public Integer getTodoId() {
        return (Integer) get(3);
    }

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    @Override
    public Record1<Integer> key() {
        return (Record1) super.key();
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached NotesRecord
     */
    public NotesRecord() {
        super(Notes.NOTES);
    }

    /**
     * Create a detached, initialised NotesRecord
     */
    public NotesRecord(Integer id, String title, String markdownContent, Integer todoId) {
        super(Notes.NOTES);

        setId(id);
        setTitle(title);
        setMarkdownContent(markdownContent);
        setTodoId(todoId);
        resetTouchedOnNotNull();
    }
}
