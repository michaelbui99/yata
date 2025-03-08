import { Controller, Get } from '@nestjs/common';
import { TodosRepository } from '../../repositories/todos';
import { Todo } from '../../models/todo';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosRepository: TodosRepository) {}

  @Get()
  getAll(): Todo[] {
    return [];
  }
}
