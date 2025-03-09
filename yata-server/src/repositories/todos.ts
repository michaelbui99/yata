import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { Db } from '../db/db';
import { Uuid } from '../models/uuid';
import { Optional } from '../optional';
import { DetailedTodo, Todo } from '../models/todo';
import { Tag } from '../models/tag';

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

  async getAllTodos(): Promise<Todo[]> {
    const todoResults = await this.db.db.all(
      'SELECT id, title,  completed FROM todos',
    );

    return todoResults as Todo[];
  }

  async getById(todoId: string): Promise<Optional<DetailedTodo>> {
    const todoResult = await this.db.db.get<TodoById>(
      'SELECT id, title, description, completed, creationDate, timeLogged FROM todos WHERE id = :todoId',
      {
        ':todoId': todoId,
      },
    );
    if (!todoResult) {
      return Optional.empty();
    }

    // TODO: Fetch tags and notes, include in return.
    todoResult['tags'] = [];
    todoResult['subTasks'] = [];
    return Optional.of(todoResult as unknown as DetailedTodo);
  }
}

type TodoById = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  creationDate: string;
  timeLogged: number;
};
