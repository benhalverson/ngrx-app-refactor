import { enableProdMode, isDevMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Routes } from '@angular/router';
import { AuthGuard } from './app/auth/auth.guard';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthModule } from './app/auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';

const routes: Routes = [
    {
        path: 'courses',
        loadChildren: () => import("./app/courses/courses.module").then(m => m.CoursesModule),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: '/'
    }
];




if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, MatMenuModule, MatIconModule, MatSidenavModule, MatProgressSpinnerModule, MatListModule, MatToolbarModule, AuthModule.forRoot(), StoreModule.forRoot({}, {}), EffectsModule.forRoot([]), StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        provideRouter(routes)
    ]
})
  .catch(err => console.log(err));
