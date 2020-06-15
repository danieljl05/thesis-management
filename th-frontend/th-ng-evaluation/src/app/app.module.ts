
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';

// Locale imports
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';

// JWT imports
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard, LoginGuard, TokenService } from "th-ng-commons";
import { ErrorComponent } from './layouts/error/error.component';
import { AuthService } from './services/auth.service';
import { SpinnerHttpRequest } from './interceptors/spinner-http-request';

import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';

registerLocaleData(localeEs, 'es-CO', localeEsExtra);

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes, { preloadingStrategy: PreloadAllModules }),
    JwtModule.forRoot({
      config: {
        tokenGetter: TokenService.getToken,
        whitelistedDomains: ["localhost:8084", "localhost:8081"],
        blacklistedRoutes: []
      }
    }),
    NgxSpinnerModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    TokenService,
    AuthGuard,
    LoginGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerHttpRequest,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
