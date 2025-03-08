import { Database, open } from 'sqlite';
import * as sqlite3 from 'sqlite3';
import { YataConfig } from '../config/yata-config';
import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '@nestjs/common';

export class Db {
  private readonly logger = new Logger(Db.name);
  db: Database<sqlite3.Database, sqlite3.Statement>;
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
      .then(() => this.ensureTables(this.db))
      .catch((e) => console.error(e));
  }

  private async ensureDatabase(config: YataConfig): Promise<any> {
    this.db = await open({
      filename: `${config.dataFolder}/yata.db`,
      mode: sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      driver: sqlite3.Database,
    });
  }

  private async ensureTables(
    db: Database<sqlite3.Database, sqlite3.Statement>,
  ): Promise<void> {
    await db.exec('CREATE TABLE IF NOT EXISTS tags (id TEXT PRIMARY KEY)');
  }
}
