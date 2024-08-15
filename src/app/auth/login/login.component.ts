import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";

import { Store } from "@ngrx/store";

import { AuthService } from "../auth.service";
import { tap } from "rxjs/operators";
import { noop } from "rxjs";
import { Router } from "@angular/router";
import { AppState } from '../reducers';
import { login } from '../auth.actions';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardTitle, MatCardContent, ReactiveFormsModule, MatFormField, MatInput, MatButton]
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private readonly store: Store<AppState>
  ) {

    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });

  }

  ngOnInit() {

  }

  login() {
    const formValue = this.form.value;
    this.auth.login(formValue.email, formValue.password).pipe(tap((user) => {
      this.store.dispatch(login({ user }));

      this.router.navigateByUrl('/courses');

    })).subscribe(noop, () => console.error('Login Failed'));

  }

}

