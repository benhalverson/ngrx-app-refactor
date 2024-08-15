import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";

import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import {
  select,
  Store,
} from "@ngrx/store";

import { isLoggedIn } from "./auth.selectors";
import { AppState } from "./reducers";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly store: Store<AppState>,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(isLoggedIn),
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigateByUrl("/login");
        }
      })
    );
  }
}
