import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {TodosService} from '../services/todos.service';
import {DetailedTodo} from '../models/todo';
import {ActivatedRoute, Router} from '@angular/router';
import {Chip} from 'primeng/chip';
import {Tag} from '../models/tag';

@Component({
  selector: 'yata-todo',
  imports: [
    Chip
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit {
  todo: WritableSignal<DetailedTodo | null> = signal(null)

  constructor(private readonly route: ActivatedRoute, private readonly router: Router, readonly todosService: TodosService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: paramMap => {
        const id = paramMap.get("id");
        if (!id) {
          this.router.navigate(["/todos"]).then(r => console.log("NAVIGATED", r))
          return;
        }

        this.todosService.getTodo(id).subscribe({
          next: todo => {
            this.todo.set(todo);
          }
        })
      }
    });
  }

  onRemoveTag(tag: Tag){
    console.log(tag);
  }
}
