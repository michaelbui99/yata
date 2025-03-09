import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { Db } from '../db/db';
import { Uuid } from '../models/uuid';
import { Optional } from '../optional';
import { DetailedTodo } from '../models/todo';

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

  async getAllTodos(): Promise<DetailedTodo[]> {
    const todoResults = await this.db.db.all(
      'SELECT id, title, description, completed, creationDate, timeLogged FROM todos',
    );

    // TODO: Fetch tags and notes

    return todoResults as DetailedTodo[];
  }
}
