import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { DetailedTodo, Todo } from '../../models/todo';
import { TodosService } from '../../services/todos/todos.service';

@Controller('api/v1/todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async getAll(): Promise<Todo[]> {
    return await this.todosService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id?: string): Promise<DetailedTodo> {
    if (!id) {
      throw new HttpException('Must provide Todo ID', HttpStatus.BAD_REQUEST);
    }

    const todo = await this.todosService.getById(id);
    if (!todo.isPresent()) {
      throw new HttpException(
        `Todo with id '${id}' was not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return todo.get();
  }
}
