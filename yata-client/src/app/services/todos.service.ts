import {Injectable} from '@angular/core';
import {Observable, of, switchMap} from 'rxjs';
import {DetailedTodo, Todo} from '../models/todo';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private readonly configService: ConfigService, private readonly httpClient: HttpClient) {
  }

  getTodos(folder?: string, tag?: string): Observable<Todo[]> {
    return this.configService.getConfig().pipe(
      switchMap(config => {
        const url = `${config.serverUrl}/api/v1/todos`;
        return this.httpClient.get<Todo[]>(url);
      })
    );
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
