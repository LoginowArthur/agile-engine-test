import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs';
import { ImagesApiService } from '../services/images-api/images-api.service';

@Injectable({
  providedIn: 'root',
})
export class GalleryData implements Resolve<Observable<any>> {
  constructor(
    private route: ActivatedRoute,
    private imagesApiService: ImagesApiService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.imagesApiService.getPicturesByPage$(
      route.paramMap.get('pageNumber')
    );
  }
}
