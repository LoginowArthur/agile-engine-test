import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';

import { API_KEY, TOKEN_URL } from 'src/app/global/gallery-api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isHeaderAvailableSource = new BehaviorSubject<boolean>(false);
  public isHeaderAvailable$ = this.isHeaderAvailableSource.asObservable();

  public waitForHeaders$ = this.isHeaderAvailable$.pipe(
    filter((isHeaderAvailable) => !!isHeaderAvailable),
    first()
  );

  public headers: { authorization: string } = { authorization: '' };

  constructor(private http: HttpClient) {}

  public setHeadersWithValidToken(): void {
    this.http
      .post(TOKEN_URL, { apiKey: API_KEY })
      .pipe(
        first(),
        tap((response: { token: string }) => {
          this.headers = { authorization: response.token };
          this.isHeaderAvailableSource.next(true);
        })
      )
      .subscribe();
  }
}
