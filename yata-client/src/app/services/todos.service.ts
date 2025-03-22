import {Injectable} from '@angular/core';
import {Observable, of, switchMap} from 'rxjs';
import {DetailedTodo, Todo} from '../models/todo';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';
import {YataHttpService} from './yata-http.service';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private readonly http: YataHttpService) {
  }

  async getTodos(): Promise<Todo[]> {
    const path = `api/v1/todos`;
    const res = await this.http.get<Todo[]>(path);

    if (res.data === undefined || res.data === null || res.error) {
      console.error("Failed to fetch todos", res);
    }

    return res.data!;
  }

  async getTodo(todoId: string): Promise<DetailedTodo> {
    const path = `api/v1/todos/${todoId}`;
    const res = await this.http.get<DetailedTodo>(path);

    if (!res.data || res.error){
      console.error("Failed to fetch todo", res);
    }

    return res.data!;
  }
}
