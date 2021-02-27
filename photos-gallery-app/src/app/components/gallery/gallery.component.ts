import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject, zip } from 'rxjs';

import { first, switchMap, tap, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

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
  private bearerTokenSource = new Subject<string>();
  private bearerToken$ = this.bearerTokenSource.asObservable();

  public pictures = new Observable<any>();

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.getValidToken(this.tokenUrl, this.apiKey)
      .pipe(
        first(),
        tap((response) => this.bearerTokenSource.next(response.token))
      )
      .subscribe();
  }

  ngOnInit(): void {
    zip(this.bearerToken$, this.route.paramMap)
      .pipe(
        first(),
        map(([bearerToken, paramMap]) => {
          this.bearerToken = bearerToken;
          return { bearerToken: bearerToken, pageNumber: paramMap.get('page') };
        }),
        switchMap((response: { bearerToken: string; pageNumber: string }) => {
          return this.getPicturesByPage(
            response.bearerToken,
            response.pageNumber
          );
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
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  }

  onImageClicked(imageId: string) {
    this.getImageById(imageId, this.bearerToken).subscribe(console.log);
  }
}
