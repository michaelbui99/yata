import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {ApiResponse} from '../models/apiresponse';
import {ConfigService} from './config.service';
import {ClientConfig} from '../models/client-config';

@Injectable({
  providedIn: 'root'
})
export class YataHttpService {
  constructor(private readonly httpClient: HttpClient, private readonly configService: ConfigService) {
  }

  public async postJson<T>(path: string, payload: any): Promise<ApiResponse<T>> {
    const headers = {
      "Content-Type": "application/json"
    };
    return lastValueFrom(this.httpClient.post<ApiResponse<T>>(await this.getUrl(path), payload, {headers}));
  }

  public async putJson<T>(path: string, payload: any): Promise<ApiResponse<T>> {
    const headers = {
      "Content-Type": "application/json"
    };
    return lastValueFrom(this.httpClient.put<ApiResponse<T>>(await this.getUrl(path), payload, {headers}));
  }

  public async delete<T>(path: string): Promise<ApiResponse<T>> {
    return lastValueFrom(this.httpClient.delete<ApiResponse<T>>(await this.getUrl(path)));
  }

  public async get<T>(path: string): Promise<ApiResponse<T>> {
    return lastValueFrom(this.httpClient.get<ApiResponse<T>>(await this.getUrl(path)));
  }

  private async getConfig(): Promise<ClientConfig> {
    return lastValueFrom(this.configService.getConfig());
  }

  private async getUrl(path: string): Promise<string> {
    const config = await this.getConfig();
    return `${config.serverUrl}/${path}`;
  }
}
