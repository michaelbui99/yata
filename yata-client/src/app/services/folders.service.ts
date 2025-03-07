import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Folder} from '../models/folder';

@Injectable({
  providedIn: 'root'
})
export class FoldersService {
  private folders: Folder[] = [];

  constructor() {
  }

  getFolder(folderId: string): Observable<Folder | undefined> {
    return of(this.folders.find(folder => folder.id === folderId));
  }

  getFolders(): Observable<Folder[]> {
    if (this.folders.length > 0) {
      return of(this.folders);
    }
    return this.refreshFolders();
  }

  private refreshFolders(): Observable<Folder[]> {
    this.folders = [
      {
        id: "today",
        name: "Today",
        todos: []
      },
      {
        id: "TEST",
        name: "DEMETER",
        todos: []
      }
    ];
    return of(this.folders);
  }
}
