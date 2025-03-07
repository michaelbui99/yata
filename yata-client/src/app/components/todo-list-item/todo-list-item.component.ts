import {Component, model, ModelSignal} from '@angular/core';
import {Todo} from '../../models/todo';
import {NgClass} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'yata-todo-list-item',
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './todo-list-item.component.html',
  styleUrl: './todo-list-item.component.scss',
  standalone: true
})
export class TodoListItemComponent {
  todo: ModelSignal<Todo | null> = model<Todo | null>(null);

  onCheck() {
    this.todo.update(val => {
      if (!val) {
        return null;
      }

      return {
        ...val,
        ...{
          completed: !val.completed
        }
      }
    })
  }
}
