import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { fromEvent, Observable, of, pipe, Subscription } from 'rxjs';
import { exhaust, filter, first, switchMap, tap } from 'rxjs/operators';
import { ImagesApiService } from 'src/app/services/images-api/images-api.service';

interface galleryData {
  page: number;
  pageCount: number;
  hasMore: boolean;
  pictures: any[];
}

@Component({
  selector: 'pga-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  private listenToRouteData$ = this.route.data.pipe(
    tap((data: { galleryData: galleryData }) => {
      this.setGalleryView(data.galleryData);
    })
  );
  private listenToRouteDataSub: Subscription;

  public pictures$ = new Observable<any[]>();
  public page: number;
  public pageCount: number;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private imagesApiService: ImagesApiService
  ) {
    // Add more validations
    if (+this.route.snapshot.paramMap.get('pageNumber') < 1) {
      this.router.navigate(['gallery/1']);
    }
  }

  ngOnInit(): void {
    this.listenToRouteDataSub = this.listenToRouteData$.subscribe();
    fromEvent(document, 'click')
      .pipe(tap((e) => console.log(e.target['localName'])))
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.listenToRouteDataSub) {
      this.listenToRouteDataSub.unsubscribe();
    }
  }

  setGalleryView(galleryData: galleryData) {
    this.pictures$ = of(galleryData.pictures);
    this.page = +galleryData.page;
    this.pageCount = +galleryData.pageCount;
  }

  getPictureDetails(imageId: string, imageIndex: number) {
    this.imagesApiService.getImageById$(imageId).subscribe();
  }

  pageNav(galleryPage: number, pageCount: number) {
    this.router.navigate([`gallery/${galleryPage}`]);
  }
}
