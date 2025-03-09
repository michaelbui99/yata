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
    return this.configService.getConfig().pipe(
      switchMap(config => {
        const url = `${config.serverUrl}/api/v1/todos/${todoId}`;
        return this.httpClient.get<DetailedTodo>(url);
      })
    );
  }
}
