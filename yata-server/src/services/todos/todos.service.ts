import { Injectable } from '@nestjs/common';
import { TodosRepository } from '../../repositories/todos';
import { DetailedTodo, Todo } from '../../models/todo';
import { Optional } from '../../optional';

@Injectable()
export class TodosService {
  constructor(private readonly todosRepository: TodosRepository) {}

  async getAll(): Promise<Todo[]> {
    return this.todosRepository.getAllTodos();
  }

  async getById(todoId: string): Promise<Optional<DetailedTodo>> {
    return this.todosRepository.getById(todoId);
  }
}
