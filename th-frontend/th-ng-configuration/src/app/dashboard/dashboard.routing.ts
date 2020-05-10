import { Routes } from '@angular/router';

import { AnnuityComponent } from './annuity/annuity.component';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { AnnuityBuildComponent } from './annuity/annuity-build/annuity-build.component';
import { UserBuildComponent } from './user/user-build/user-build.component';
import { ProjectBuildComponent } from './project/project-build/project-build.component';

export const DashboardRoutes: Routes = [
  // { path: 'home', component: DashboardComponent },
  { path: 'users', component: UserComponent },
  { path: 'projects', component: ProjectComponent },
  { path: 'projects/build', component: ProjectBuildComponent },
  { path: 'projects/build/:id', component: ProjectBuildComponent },
  { path: 'annuities', component: AnnuityComponent },
  { path: 'annuities/build', component: AnnuityBuildComponent },
  { path: 'annuities/build/:id', component: AnnuityBuildComponent },
  { path: 'users/build', component: UserBuildComponent },
  { path: 'users/build/:id', component: UserBuildComponent },
];
