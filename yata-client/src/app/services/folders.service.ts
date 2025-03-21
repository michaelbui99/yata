import {Injectable} from '@angular/core';
import {Observable, of, Subject, switchMap} from 'rxjs';
import {Folder} from '../models/folder';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {Todo} from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class FoldersService {
  private folders: Folder[] = [];

  constructor(private readonly configService: ConfigService, private readonly httpClient: HttpClient) {
  }

  getFolder(folderId: number): Observable<Folder | undefined> {
    return of(this.folders.find(folder => folder.id === folderId));
  }

  getFolders(): Observable<Folder[]> {
    if (this.folders.length > 0) {
      return of(this.folders);
    }
    return this.refreshFolders();
  }

  private refreshFolders(): Observable<Folder[]> {
    return this.configService.getConfig().pipe(
      switchMap(config => {
        const url = `${config.serverUrl}/api/v1/folders`;
        return this.httpClient.get<Folder[]>(url);
      })
    );
  }
}
