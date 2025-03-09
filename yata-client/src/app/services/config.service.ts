import {Injectable} from '@angular/core';
import {ClientConfig} from '../models/client-config';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private readonly httpClient: HttpClient) {
  }

  getConfig(): Observable<ClientConfig> {
    return this.httpClient.get<ClientConfig>('/config.json');
  }
}
