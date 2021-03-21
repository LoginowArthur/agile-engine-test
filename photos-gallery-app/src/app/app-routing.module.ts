import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryItemComponent } from './components/gallery-item/gallery-item.component';
import { GalleryComponent } from './components/gallery/gallery.component';

const routes: Routes = [
  { path: 'gallery/:page', component: GalleryComponent },
  { path: 'photo/:id', component: GalleryItemComponent },
  { path: '', redirectTo: 'gallery/1', pathMatch: 'full' },
  { path: '**', redirectTo: 'gallery/1' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
