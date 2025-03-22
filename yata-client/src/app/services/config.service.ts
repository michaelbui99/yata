import {Injectable} from '@angular/core';
import {ClientConfig} from '../models/client-config';
import {HttpClient} from '@angular/common/http';
import {Observable, of, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private clientConfig: ClientConfig | undefined;

  constructor(private readonly httpClient: HttpClient) {
  }

  getConfig(): Observable<ClientConfig> {
    if (!this.clientConfig) {
      // this.httpClient.get<ClientConfig | undefined>('/config.json').pipe(
      //   switchMap(config => {
      //     this.clientConfig = config ?? {serverUrl: "http://localhost:8080"};
      //     return of(config);
      //   })
      // );
      this.clientConfig = {serverUrl: "http://yata-server.michaelbui.dk:8080"};
    }
    return of(this.clientConfig!);
  }
}
