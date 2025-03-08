import { Database, open } from 'sqlite';
import * as sqlite3 from 'sqlite3';
import { YataConfig } from '../config/yata-config';
import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '@nestjs/common';

export class Db {
  private readonly logger = new Logger(Db.name);
  db: Database;
  private readonly config: YataConfig;

  constructor(config: YataConfig) {
    this.config = config;
    this.init(config);
  }

  private init(config: YataConfig) {
    this.logger.log('Initializing DB');
    if (!fs.existsSync(path.resolve(config.dataFolder))) {
      this.logger.log('Creating data folder...');
      fs.mkdirSync(path.resolve(config.dataFolder));
    }

    this.ensureDatabase(config)
      .then(() => this.ensureTables().then(() => this.ensureColumns()))
      .catch((e) => console.error(e));
  }

  private async ensureDatabase(config: YataConfig): Promise<any> {
    this.db = await open({
      filename: `${config.dataFolder}/yata.db`,
      mode: sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      driver: sqlite3.Database,
    });
  }

  private async ensureTables(): Promise<void> {
    await this.db.exec(
      'CREATE TABLE IF NOT EXISTS todos (id TEXT PRIMARY KEY)',
    );
    await this.db.exec('CREATE TABLE IF NOT EXISTS tags (id TEXT PRIMARY KEY)');
    await this.db.exec(
      'CREATE TABLE IF NOT EXISTS notes (id TEXT PRIMARY KEY)',
    );
    await this.db.exec(
      'CREATE TABLE IF NOT EXISTS folders (id TEXT PRIMARY KEY)',
    );
  }

  private async ensureColumns() {
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
      return 'ALTER TABLE todos ADD COLUMN timeLogged INTEGER default null';
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
