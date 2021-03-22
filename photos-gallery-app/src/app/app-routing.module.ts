import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryItemComponent } from './components/gallery-item/gallery-item.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { GalleryDataGuardService } from './guards/gallery-data-guard.service';
import { GalleryData } from './resolvers/gallery-data.resolver';

const routes: Routes = [
  {
    path: 'gallery/:pageNumber',
    component: GalleryComponent,
    canActivate: [GalleryDataGuardService],
    resolve: { galleryData: GalleryData },
  },
  { path: '', redirectTo: 'gallery/1', pathMatch: 'full' },
  { path: '**', redirectTo: 'gallery/1' },
  {
    path: 'picture/:id',
    outlet: 'gallery-item',
    component: GalleryItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
