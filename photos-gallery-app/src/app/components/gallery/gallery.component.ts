import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of, pipe } from 'rxjs';

import { first, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'pga-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  private agileEngineApiUrl = 'http://interview.agileengine.com';
  private tokenUrl = 'http://interview.agileengine.com/auth';
  private apiKey = '23567b218376f79d9415';
  private bearerToken: string;

  public pictures = new Observable<any>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getValidToken(this.tokenUrl, this.apiKey)
      .pipe(
        first(),
        switchMap((response: { auth: boolean; token: string }) => {
          this.bearerToken = response.token;
          return this.getPicturesByPage(response.token);
        }),
        tap((picturesResponse: { pictures: any[] }) => {
          this.pictures = of(picturesResponse.pictures);
        })
      )
      .subscribe();
  }

  getValidToken(tokenUrl: string, apiKey: string): Observable<any> {
    return this.http.post(tokenUrl, { apiKey: apiKey });
  }

  getPicturesByPage(bearerToken: string, galleryPage = '1') {
    return this.http.get(
      `${this.agileEngineApiUrl}/images?page=${galleryPage}`,
      {
        headers: { Authorization: `Bearer ${bearerToken}` },
      }
    );
  }

  getImageById(imageId: string, bearerToken) {
    return this.http.get(`${this.agileEngineApiUrl}/images/${imageId}`, {
      headers: { Authorization: `Bearer ${this.bearerToken}` },
    });
  }

  onImageClicked(imageId: string) {
    this.getImageById(imageId, this.bearerToken)
      .pipe(first())
      .subscribe(console.log);
  }
}
