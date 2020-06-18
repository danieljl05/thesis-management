import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { ErrorComponent } from './layouts/error/error.component';
import { AuthGuard } from 'th-ng-commons';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        // canActivate: [AuthGuard]
      }
    ]
  }, {
    path: '**',
    component: ErrorComponent
  }
];
