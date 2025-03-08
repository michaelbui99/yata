import { Controller, Get } from '@nestjs/common';
import { Todo } from '../../models/todo';
import { TodosService } from '../../services/todos/todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  getAll(): Todo[] {
    return [];
  }
}
