import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {DetailedTodo, Todo} from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor() {
  }

  getTodos(folder?: string, tag?: string): Observable<Todo[]> {
    return of([
      {
        id: "1",
        title: "todo1",
        completed: true
      },
      {
        id: "2",
        title: "todo2",
        completed: false
      },
    ]);
  }

  getTodo(todoId: string): Observable<DetailedTodo> {
    return of({
      id: "test",
      title: "test",
      description: "TEST desc",
      completed: false,
      creationDate: new Date(),
      tags: [
        {
          id: "t1",
          name: "DEMETER",
          color: "#333"
        }
      ],
      subTasks: [],
      timeLogged: 2000
    })
  }
}
