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
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      }
    ]
  }, {
    path: '**',
    component: ErrorComponent
  }
];
