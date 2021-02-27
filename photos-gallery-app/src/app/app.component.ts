import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { of } from 'rxjs';

import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'pga-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private agileEngineApiUrl = 'http://interview.agileengine.com';
  private tokenUrl = 'http://interview.agileengine.com/auth';
  private apiKey = '23567b218376f79d9415';

  constructor(private http: HttpClient) {
    this.http
      .post(this.tokenUrl, { apiKey: this.apiKey })
      .pipe(
        switchMap((response: { auth: boolean; token: string }) => {
          return this.http.get(this.agileEngineApiUrl, {
            headers: { Authorization: `Bearer ${response.token}` },
          });
        })
      )
      .subscribe();
  }
}
