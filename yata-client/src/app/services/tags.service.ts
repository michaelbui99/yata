import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Tag} from '../models/tag';
import {YataHttpService} from './yata-http.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  constructor(private readonly http: YataHttpService) {
  }

  async getTags(): Promise<Tag[]> {
    return [];
  }
}
