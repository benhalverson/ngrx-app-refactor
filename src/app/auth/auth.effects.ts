import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { tap } from "rxjs/operators";

import {
  Actions,
  createEffect,
  ofType,
} from "@ngrx/effects";

import { AuthActions } from "./action.types";

@Injectable({ providedIn: "root" })
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router) {
    createEffect(
      () =>
        this.actions$.pipe(
          ofType(AuthActions.login),
          tap((action) =>
            localStorage.setItem("user", JSON.stringify(action.user))
          )
        ),
      { dispatch: false }
    );

    createEffect(
      () =>
        this.actions$.pipe(
          ofType(AuthActions.logout),
          tap((action) => {
            localStorage.removeItem("user");
            this.router.navigateByUrl("/login");
          })
        ),
      { dispatch: false }
    );
  }
}
