import {Component, computed, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FoldersService} from '../services/folders.service';
import {Todo} from '../models/todo';
import {firstValueFrom, lastValueFrom} from 'rxjs';
import {TodosService} from '../services/todos.service';
import {TodoListItemComponent} from '../components/todo-list-item/todo-list-item.component';

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
  todos: WritableSignal<Todo[]> = signal([]);
  completedTodosCount: Signal<number> = computed(() => this.todos().filter(todo => todo.completed).length)
  totalTodosCount: Signal<number> = computed(() => this.todos().length)

  constructor(private readonly route: ActivatedRoute, private readonly foldersService: FoldersService, private readonly todosService: TodosService) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next: queryParams => {
        const folderId = queryParams.get("folder");
        if (folderId) {
          this.initializeFromFolder(folderId);
        } else {
          this.initializeDefault();
        }
      }
    })
  }

  private initializeDefault(): void {
    this.title.set(this.DEFAULT_TITLE);
    this.todosService.getTodos().subscribe({
      next: todos => {
        this.todos.set(todos);
      }
    });
  }

  private initializeFromFolder(folderId: string): void{
    this.foldersService.getFolder(folderId).subscribe({
      next: folder => {
        this.title.set(folder ? folder.name : this.DEFAULT_TITLE);
        this.todosService.getTodos(folderId).subscribe({
          next: todos => {
            this.todos.set(todos);
          }
        });
      }
    });
  }
}
