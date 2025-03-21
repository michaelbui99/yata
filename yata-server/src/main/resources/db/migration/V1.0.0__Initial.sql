CREATE TABLE IF NOT EXISTS todos
(
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    title         TEXT NOT NULL,
    description   TEXT    DEFAULT NULL,
    completed     BOOLEAN DEFAULT FALSE,
    creation_date TEXT    DEFAULT NULL,
    time_logged   INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS tags
(
    name  TEXT PRIMARY KEY,
    color TEXT
);

CREATE TABLE IF NOT EXISTS notes
(
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    title            TEXT NOT NULL,
    markdown_content TEXT NOT NULL,
    todo_id          INTEGER,
    FOREIGN KEY (todo_id) references todos (id)
);

CREATE TABLE IF NOT EXISTS folders
(
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS folder_todos
(
    folder_id INTEGER,
    todo_id   INTEGER,
    FOREIGN KEY (folder_id) REFERENCES folders (id),
    FOREIGN KEY (todo_id) REFERENCES todos (id),
    PRIMARY KEY (folder_id, todo_id)
);

CREATE TABLE IF NOT EXISTS todo_tags
(
    tag_name TEXT,
    todo_id  INTEGER,
    FOREIGN KEY (tag_name) REFERENCES tags (name),
    FOREIGN KEY (todo_id) REFERENCES todos (id),
    PRIMARY KEY (tag_name, todo_id)
);




