import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { Db } from '../db/db';
import { Uuid } from '../models/uuid';
import { Optional } from '../optional';

@Injectable()
export class TodosRepository {
  private readonly db: Db;

  constructor(private readonly configService: ConfigService) {
    const config = this.configService.getConfig();
    this.db = Db.get(config);
  }

  async createTodo(
    title: string,
    description: string,
  ): Promise<Optional<number>> {
    const result = await this.db.db.run(
      'INSERT INTO todos (id, title, description, completed, creationDate, timeLogged) VALUES (?, ?, ?, ?, ?, ?)',
      Uuid.generateUuid(),
      title,
      description,
      false,
      new Date().toISOString(),
      0,
    );

    return Optional.of(result.lastID);
  }
}
