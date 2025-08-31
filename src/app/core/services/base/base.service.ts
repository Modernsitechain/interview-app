/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
// import { ApiBaseResponse } from '@core/interfaces'; // pake kalau ada

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  public readonly http = inject(HttpClient);
  private readonly baseUrl = environment.BASE_URL.ECOSYSTEM;

  // API
  protected getFromAPI<T, R = T>(
    endpoint: string,
    params?: T
  ): Observable<R> {
    let httpParams = new HttpParams();

    const url = this.baseUrl + endpoint;

    if (params) {
      Object.keys(params).forEach((key) => {
        const value = (params as any)[key];
        if (value !== null && value !== undefined) {
          httpParams = httpParams.set(key, value);
        }
      });
    }

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });

    return this.http.get<R>(url, {
      params: httpParams,
      headers: headers
    });
  }

  protected postFromAPI<T, R = T>(
    endpoint: string,
    payload: T,
    params?: T
  ): Observable<R> {
    let httpParams = new HttpParams();

    const url = this.baseUrl + endpoint;

    if (params) {
      Object.keys(params).forEach((key) => {
        const value = (params as any)[key];
        if (value !== null && value !== undefined) {
          httpParams = httpParams.set(key, value);
        }
      });
    }

    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');

    return this.http.post<R>(url, payload, {
      headers: headers
    });
  }

  protected patchFromAPI<T, R = T>(
    endpoint: string,
    payload: T
  ): Observable<R> {
    const path = this.baseUrl + endpoint;
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });

    return this.http.patch<R>(path, payload, {
      headers: headers
    });
  }

  protected deleteFromAPI<T>(endpoint: string): Observable<T> {
    const path = this.baseUrl + endpoint;

    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });

    return this.http.delete<T>(path, { headers: headers });
  }
}
