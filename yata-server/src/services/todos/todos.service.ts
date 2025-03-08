import { Injectable } from '@nestjs/common';
import { TodosRepository } from '../../repositories/todos';
import { Todo } from '../../models/todo';

@Injectable()
export class TodosService {
  constructor(private readonly todosRepository: TodosRepository) {}

  async getAll(): Promise<Todo[]> {
    return [];
  }
}
