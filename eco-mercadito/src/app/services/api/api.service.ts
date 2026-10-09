import { Injectable, inject } from '@angular/core';
import {HttpClient, HttpContext, HttpParams} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  get(endpoint: string, params?: any) {
    return this.http.get<any>(`${this.baseUrl}/${endpoint}`, { params: new HttpParams({ fromObject: params ?? {} }) });
  }
  post(endpoint: string, body: any, option?: {context?: HttpContext}) {
    return this.http.post<any>(`${this.baseUrl}/${endpoint}`, body);
  }
  put(endpoint: string, body: any) {
    return this.http.put<any>(`${this.baseUrl}/${endpoint}`, body);
  }
  delete(endpoint: string) {
    return this.http.delete<any>(`${this.baseUrl}/${endpoint}`);
  }
}
