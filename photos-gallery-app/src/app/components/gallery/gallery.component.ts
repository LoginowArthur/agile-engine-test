import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap, map, first, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ImagesApiService } from 'src/app/services/images-api/images-api.service';

@Component({
  selector: 'pga-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  public pictures$ = new Observable<any[]>();

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private imagesApiService: ImagesApiService
  ) {
    this.authService.setHeadersWithValidToken();
  }

  ngOnInit(): void {
    this.authService.waitForHeaders$
      .pipe(tap(() => this.setPictures()))
      .subscribe();
  }

  onImageClicked(imageId: string) {
    this.imagesApiService.getImageById(imageId).pipe(first()).subscribe();
  }

  setPictures() {
    this.route.paramMap
      .pipe(
        map((paramMap) => paramMap.get('page')),
        switchMap((pageNumber) =>
          this.imagesApiService.getPicturesByPage(pageNumber)
        ),
        tap((response: { pictures: any[] }) => {
          this.pictures$ = of(response.pictures);
        })
      )
      .subscribe();
  }
}
