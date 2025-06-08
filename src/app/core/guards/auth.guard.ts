import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { AppState } from "../../store/reducers";
import { role } from "../../store/selectors";
import { Role } from "../../enums";

@Injectable({
  providedIn: 'root'
})
export class CanActivateDashboard implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select(role).pipe(
      map(userRole => userRole ? true : this.router.createUrlTree(['/auth']))
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class CanActivateAuth implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select(role).pipe(
      map(userRole => !userRole ? true : this.router.createUrlTree(['/dashboard']))
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class CanActivateFormBuilder implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select(role).pipe(
      map(userRole => userRole == Role.Admin ? true : this.router.createUrlTree(['/dashboard/form-view']))
    );
  }
}
