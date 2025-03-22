import {Component, computed, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FoldersService} from '../services/folders.service';
import {Todo} from '../models/todo';
import {firstValueFrom, from, lastValueFrom} from 'rxjs';
import {TodosService} from '../services/todos.service';
import {TodoListItemComponent} from '../components/todo-list-item/todo-list-item.component';
import {StateStoreService} from '../services/state-store.service';

@Component({
  selector: 'yata-todos',
  imports: [
    TodoListItemComponent
  ],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {
  private readonly DEFAULT_TITLE = "TODOs";

  title: WritableSignal<string> = signal(this.DEFAULT_TITLE);
  todos: WritableSignal<Todo[]>;
  completedTodosCount: Signal<number> = computed(() => this.todos().filter(todo => todo.completed).length)
  totalTodosCount: Signal<number> = computed(() => this.todos().length)

  constructor(private readonly stateStore: StateStoreService) {
    this.todos = stateStore.state.todos.todos;
    stateStore.state.todos.fetchTodos();
  }

  ngOnInit(): void {
  }
}
