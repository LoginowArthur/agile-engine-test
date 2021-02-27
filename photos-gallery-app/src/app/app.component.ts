import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

import { first, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'pga-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private agileEngineApiUrl = 'http://interview.agileengine.com';
  private tokenUrl = 'http://interview.agileengine.com/auth';
  private apiKey = '23567b218376f79d9415';

  public pictures = new Observable<any>();

  constructor(private http: HttpClient) {
    this.getImagesByPage()
      .pipe(
        tap(
          (galleryResponse: { pictures: any[] }) =>
            (this.pictures = of(galleryResponse.pictures))
        )
      )
      .subscribe(console.log);
  }

  getImagesByPage() {
    return this.http.post(this.tokenUrl, { apiKey: this.apiKey }).pipe(
      switchMap((response: { auth: boolean; token: string }) => {
        return this.http.get(`${this.agileEngineApiUrl}/images`, {
          headers: { Authorization: `Bearer ${response.token}` },
        });
      })
    );
  }
}
