import { AsyncPipe, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { MatListItem, MatNavList } from "@angular/material/list";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatSidenav, MatSidenavContainer } from "@angular/material/sidenav";
import { MatToolbar } from "@angular/material/toolbar";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterLink,
  RouterOutlet,
} from "@angular/router";

import { Observable, of } from "rxjs";

import { select, Store } from "@ngrx/store";

import { login, logout } from "./auth/auth.actions";
import { isLoggedIn, isLoggedOut } from "./auth/auth.selectors";
import { AppState } from "./auth/reducers";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  imports: [
    MatSidenavContainer,
    MatSidenav,
    MatNavList,
    MatListItem,
    RouterLink,
    MatIcon,
    MatToolbar,
    NgIf,
    MatProgressSpinner,
    RouterOutlet,
    AsyncPipe,
  ],
})
export class AppComponent implements OnInit {
  loading = true;
  isLoggedIn$: Observable<boolean> = of(false);
  isLoggedOut$: Observable<boolean> = of(true);

  constructor(
    private router: Router,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit() {
    const userProfile = localStorage.getItem("user");
    console.log("userProfile", userProfile);

    if (userProfile) {
      this.store.dispatch(login({ user: JSON.parse(userProfile) }));
    }

    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    this.isLoggedIn$ = this.store.pipe(select((state) => isLoggedIn(state)));
    this.isLoggedOut$ = this.store.pipe(select((state) => isLoggedOut(state)));
  }

  logout() {
    this.store.dispatch(logout());
  }
}
