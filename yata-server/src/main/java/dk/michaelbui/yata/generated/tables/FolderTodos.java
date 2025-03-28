/*
 * This file is generated by jOOQ.
 */
package dk.michaelbui.yata.generated.tables;


import dk.michaelbui.yata.generated.DefaultSchema;
import dk.michaelbui.yata.generated.Keys;
import dk.michaelbui.yata.generated.tables.Folders.FoldersPath;
import dk.michaelbui.yata.generated.tables.Todos.TodosPath;
import dk.michaelbui.yata.generated.tables.records.FolderTodosRecord;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import org.jooq.Condition;
import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.InverseForeignKey;
import org.jooq.Name;
import org.jooq.Path;
import org.jooq.PlainSQL;
import org.jooq.QueryPart;
import org.jooq.Record;
import org.jooq.SQL;
import org.jooq.Schema;
import org.jooq.Select;
import org.jooq.Stringly;
import org.jooq.Table;
import org.jooq.TableField;
import org.jooq.TableOptions;
import org.jooq.UniqueKey;
import org.jooq.impl.DSL;
import org.jooq.impl.SQLDataType;
import org.jooq.impl.TableImpl;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes", "this-escape" })
public class FolderTodos extends TableImpl<FolderTodosRecord> {

    private static final long serialVersionUID = 1L;

    /**
     * The reference instance of <code>folder_todos</code>
     */
    public static final FolderTodos FOLDER_TODOS = new FolderTodos();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<FolderTodosRecord> getRecordType() {
        return FolderTodosRecord.class;
    }

    /**
     * The column <code>folder_todos.folder_id</code>.
     */
    public final TableField<FolderTodosRecord, Integer> FOLDER_ID = createField(DSL.name("folder_id"), SQLDataType.INTEGER, this, "");

    /**
     * The column <code>folder_todos.todo_id</code>.
     */
    public final TableField<FolderTodosRecord, Integer> TODO_ID = createField(DSL.name("todo_id"), SQLDataType.INTEGER, this, "");

    private FolderTodos(Name alias, Table<FolderTodosRecord> aliased) {
        this(alias, aliased, (Field<?>[]) null, null);
    }

    private FolderTodos(Name alias, Table<FolderTodosRecord> aliased, Field<?>[] parameters, Condition where) {
        super(alias, null, aliased, parameters, DSL.comment(""), TableOptions.table(), where);
    }

    /**
     * Create an aliased <code>folder_todos</code> table reference
     */
    public FolderTodos(String alias) {
        this(DSL.name(alias), FOLDER_TODOS);
    }

    /**
     * Create an aliased <code>folder_todos</code> table reference
     */
    public FolderTodos(Name alias) {
        this(alias, FOLDER_TODOS);
    }

    /**
     * Create a <code>folder_todos</code> table reference
     */
    public FolderTodos() {
        this(DSL.name("folder_todos"), null);
    }

    public <O extends Record> FolderTodos(Table<O> path, ForeignKey<O, FolderTodosRecord> childPath, InverseForeignKey<O, FolderTodosRecord> parentPath) {
        super(path, childPath, parentPath, FOLDER_TODOS);
    }

    /**
     * A subtype implementing {@link Path} for simplified path-based joins.
     */
    public static class FolderTodosPath extends FolderTodos implements Path<FolderTodosRecord> {

        private static final long serialVersionUID = 1L;
        public <O extends Record> FolderTodosPath(Table<O> path, ForeignKey<O, FolderTodosRecord> childPath, InverseForeignKey<O, FolderTodosRecord> parentPath) {
            super(path, childPath, parentPath);
        }
        private FolderTodosPath(Name alias, Table<FolderTodosRecord> aliased) {
            super(alias, aliased);
        }

        @Override
        public FolderTodosPath as(String alias) {
            return new FolderTodosPath(DSL.name(alias), this);
        }

        @Override
        public FolderTodosPath as(Name alias) {
            return new FolderTodosPath(alias, this);
        }

        @Override
        public FolderTodosPath as(Table<?> alias) {
            return new FolderTodosPath(alias.getQualifiedName(), this);
        }
    }

    @Override
    public Schema getSchema() {
        return aliased() ? null : DefaultSchema.DEFAULT_SCHEMA;
    }

    @Override
    public UniqueKey<FolderTodosRecord> getPrimaryKey() {
        return Keys.FOLDER_TODOS__PK_FOLDER_TODOS;
    }

    @Override
    public List<ForeignKey<FolderTodosRecord, ?>> getReferences() {
        return Arrays.asList(Keys.FOLDER_TODOS__FK_FOLDER_TODOS_PK_FOLDERS, Keys.FOLDER_TODOS__FK_FOLDER_TODOS_PK_TODOS);
    }

    private transient FoldersPath _folders;

    /**
     * Get the implicit join path to the <code>folders</code> table.
     */
    public FoldersPath folders() {
        if (_folders == null)
            _folders = new FoldersPath(this, Keys.FOLDER_TODOS__FK_FOLDER_TODOS_PK_FOLDERS, null);

        return _folders;
    }

    private transient TodosPath _todos;

    /**
     * Get the implicit join path to the <code>todos</code> table.
     */
    public TodosPath todos() {
        if (_todos == null)
            _todos = new TodosPath(this, Keys.FOLDER_TODOS__FK_FOLDER_TODOS_PK_TODOS, null);

        return _todos;
    }

    @Override
    public FolderTodos as(String alias) {
        return new FolderTodos(DSL.name(alias), this);
    }

    @Override
    public FolderTodos as(Name alias) {
        return new FolderTodos(alias, this);
    }

    @Override
    public FolderTodos as(Table<?> alias) {
        return new FolderTodos(alias.getQualifiedName(), this);
    }

    /**
     * Rename this table
     */
    @Override
    public FolderTodos rename(String name) {
        return new FolderTodos(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public FolderTodos rename(Name name) {
        return new FolderTodos(name, null);
    }

    /**
     * Rename this table
     */
    @Override
    public FolderTodos rename(Table<?> name) {
        return new FolderTodos(name.getQualifiedName(), null);
    }

    /**
     * Create an inline derived table from this table
     */
    @Override
    public FolderTodos where(Condition condition) {
        return new FolderTodos(getQualifiedName(), aliased() ? this : null, null, condition);
    }

    /**
     * Create an inline derived table from this table
     */
    @Override
    public FolderTodos where(Collection<? extends Condition> conditions) {
        return where(DSL.and(conditions));
    }

    /**
     * Create an inline derived table from this table
     */
    @Override
    public FolderTodos where(Condition... conditions) {
        return where(DSL.and(conditions));
    }

    /**
     * Create an inline derived table from this table
     */
    @Override
    public FolderTodos where(Field<Boolean> condition) {
        return where(DSL.condition(condition));
    }

    /**
     * Create an inline derived table from this table
     */
    @Override
    @PlainSQL
    public FolderTodos where(SQL condition) {
        return where(DSL.condition(condition));
    }

    /**
     * Create an inline derived table from this table
     */
    @Override
    @PlainSQL
    public FolderTodos where(@Stringly.SQL String condition) {
        return where(DSL.condition(condition));
    }

    /**
     * Create an inline derived table from this table
     */
    @Override
    @PlainSQL
    public FolderTodos where(@Stringly.SQL String condition, Object... binds) {
        return where(DSL.condition(condition, binds));
    }

    /**
     * Create an inline derived table from this table
     */
    @Override
    @PlainSQL
    public FolderTodos where(@Stringly.SQL String condition, QueryPart... parts) {
        return where(DSL.condition(condition, parts));
    }

    /**
     * Create an inline derived table from this table
     */
    @Override
    public FolderTodos whereExists(Select<?> select) {
        return where(DSL.exists(select));
    }

    /**
     * Create an inline derived table from this table
     */
    @Override
    public FolderTodos whereNotExists(Select<?> select) {
        return where(DSL.notExists(select));
    }
}
