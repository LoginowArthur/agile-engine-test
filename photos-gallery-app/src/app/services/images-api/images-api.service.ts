import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AGINE_ENGINE_API_URL } from 'src/app/global/gallery-api';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ImagesApiService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  // Remove any as generic type
  getPicturesByPage$(galleryPage = '1'): Observable<any> {
    return this.http.get(`${AGINE_ENGINE_API_URL}/images?page=${galleryPage}`, {
      headers: this.authService.headers,
    });
  }

  // Remove any as generic type
  getImageById$(imageId: string): Observable<any> {
    return this.http.get(`${AGINE_ENGINE_API_URL}/images/${imageId}`, {
      headers: this.authService.headers,
    });
  }
}
