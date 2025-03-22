import {Injectable} from '@angular/core';
import {TodosService} from './todos.service';
import {StateStore} from '../store/store';
import {TodosStateStore} from '../store/todos';

@Injectable({
  providedIn: 'root'
})
export class StateStoreService {
  state: StateStore;

  constructor(private readonly todosService: TodosService) {
    this.state = {
      todos: new TodosStateStore(todosService)
    }
  }
}
