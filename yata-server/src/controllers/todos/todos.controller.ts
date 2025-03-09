import { Controller, Get } from '@nestjs/common';
import { Todo } from '../../models/todo';
import { TodosService } from '../../services/todos/todos.service';

@Controller('api/v1/todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async getAll(): Promise<Todo[]> {
    return await this.todosService.getAll();
  }
}
