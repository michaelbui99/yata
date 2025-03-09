import {Injectable} from '@angular/core';
import {ClientConfig} from '../models/client-config';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom, Observable, of, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private clientConfig: ClientConfig | undefined;

  constructor(private readonly httpClient: HttpClient) {
  }

  getConfig(): Observable<ClientConfig> {
    if (!this.clientConfig) {
      this.httpClient.get<ClientConfig>('/config.json').pipe(
        switchMap(config => {
          this.clientConfig = config;
          return of(config);
        })
      );
    }
    return of(this.clientConfig!);
  }
}
