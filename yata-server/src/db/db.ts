import { Database, open } from 'sqlite';
import * as sqlite3 from 'sqlite3';
import { YataConfig } from '../config/yata-config';
import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '@nestjs/common';

export class Db {
  private static instance: Db | undefined = undefined;
  private readonly logger = new Logger(Db.name);
  db: Database;
  private readonly config: YataConfig;

  private constructor(config: YataConfig) {
    this.config = config;
    this.init(config);
  }

  public static get(config: YataConfig): Db {
    if (!Db.instance) {
      Db.instance = new Db(config);
    }

    return Db.instance;
  }

  private init(config: YataConfig) {
    this.logger.log('Initializing DB');
    if (!fs.existsSync(path.resolve(config.dataFolder))) {
      this.logger.log('Creating data folder...');
      fs.mkdirSync(path.resolve(config.dataFolder));
    }

    this.ensureDatabase(config)
      .then(() => this.ensureTables().then(() => this.ensureColumns().then(() => this.logger.log("DB Initialized."))))
      .catch((e) => console.error(e));
  }

  private async ensureDatabase(config: YataConfig): Promise<any> {
    this.logger.log('Ensuring database exists...');
    this.db = await open({
      filename: `${config.dataFolder}/yata.db`,
      mode: sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      driver: sqlite3.Database,
    });
  }

  private async ensureTables(): Promise<void> {
    this.logger.log('Ensuring tables are created...');
    await this.db.exec(
      'CREATE TABLE IF NOT EXISTS todos (id TEXT PRIMARY KEY)',
    );
    await this.db.exec('CREATE TABLE IF NOT EXISTS tags (id TEXT PRIMARY KEY)');
    await this.db.exec(
      'CREATE TABLE IF NOT EXISTS notes (id TEXT PRIMARY KEY, todo_id TEXT, FOREIGN KEY (todo_id) REFERENCES todos(id))',
    );
    await this.db.exec(
      'CREATE TABLE IF NOT EXISTS folders (id TEXT PRIMARY KEY)',
    );

    await this.db.exec(
      'CREATE TABLE IF NOT EXISTS folder_todos (folder_id TEXT, todo_id TEXT, FOREIGN KEY (folder_id) REFERENCES folders(id), FOREIGN KEY (todo_id) REFERENCES todos(id), PRIMARY KEY (folder_id, todo_id))',
    );
    await this.db.exec(
      'CREATE TABLE IF NOT EXISTS todo_tags (todo_id TEXT, tag_id TEXT, FOREIGN KEY (todo_id) REFERENCES todos(id), FOREIGN KEY (tag_id) REFERENCES tags(id), PRIMARY KEY (todo_id, tag_id))',
    );
  }

  private async ensureColumns() {
    this.logger.log('Ensuring table columns are created...');
    await this.addColumnIdempotent('todos', 'title', () => {
      return 'ALTER TABLE todos ADD COLUMN title TEXT default null';
    });
    await this.addColumnIdempotent('todos', 'description', () => {
      return 'ALTER TABLE todos ADD COLUMN description TEXT default null';
    });
    await this.addColumnIdempotent('todos', 'completed', () => {
      return 'ALTER TABLE todos ADD COLUMN completed BOOLEAN default false';
    });
    await this.addColumnIdempotent('todos', 'creationDate', () => {
      return 'ALTER TABLE todos ADD COLUMN creationDate TEXT default null';
    });
    await this.addColumnIdempotent('todos', 'timeLogged', () => {
      return 'ALTER TABLE todos ADD COLUMN timeLogged INTEGER default 0';
    });

    await this.addColumnIdempotent('tags', 'name', () => {
      return 'ALTER TABLE tags ADD COLUMN name TEXT default null';
    });
    await this.addColumnIdempotent('tags', 'color', () => {
      return 'ALTER TABLE color ADD COLUMN color TEXT default null';
    });

    await this.addColumnIdempotent('notes', 'contents', () => {
      return 'ALTER TABLE notes ADD COLUMN contents TEXT default null';
    });

    await this.addColumnIdempotent('folders', 'name', () => {
      return 'ALTER TABLE folders ADD COLUMN name TEXT default null';
    });
  }

  private async addColumnIdempotent(
    tableName: string,
    columnName: string,
    statementSupplier: () => string,
  ) {
    try {
      await this.db.exec(statementSupplier());
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      this.logger.log(
        `Column '${columnName}' already exists for table '${tableName}'.`,
      );
    }
  }
}
