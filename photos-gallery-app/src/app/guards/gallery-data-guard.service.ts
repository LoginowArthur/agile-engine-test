import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRoute,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class GalleryDataGuardService implements CanActivate {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.waitForHeaders$;
  }
}
