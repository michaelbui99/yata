import {signal, WritableSignal} from '@angular/core';
import {Todo} from '../models/todo';
import {TodosService} from '../services/todos.service';

export interface TodosState {
  todos: WritableSignal<Todo[]>;

  fetchTodos(): void;
}

export class TodosStateStore implements TodosState {
  todos: WritableSignal<Todo[]>;

  constructor(private readonly todosService: TodosService) {
    this.todos = signal<Todo[]>([]);
  }

  fetchTodos(): void {
    this.todosService.getTodos().then(res => this.todos.set(res));
  }
}
