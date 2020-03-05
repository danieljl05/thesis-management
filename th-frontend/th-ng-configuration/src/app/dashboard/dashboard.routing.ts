import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { AnnuityComponent } from './annuity/annuity.component';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { EvaluationComponent } from './evaluation/evaluation.component';

export const DashboardRoutes: Routes = [
  { path: 'home', component: DashboardComponent },
  { path: 'users', component: UserComponent },
  { path: 'projects', component: ProjectComponent },
  { path: 'evaluation', component: EvaluationComponent },
  { path: 'annuity', component: AnnuityComponent },
];
