import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Tag} from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  constructor() { }

  getTags(): Observable<Tag[]>{
    return of([
      {
        id: "1",
        name: "DEMETER",
        color: "#720f0f"
      },
      {
        id: "2",
        name: "Work",
        color: "#6d68c5"
      },
      {
        id: "3",
        name: "Personal",
        color: "#c08f24"
      }
    ])
  }
}
