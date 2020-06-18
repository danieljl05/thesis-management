import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ProjectViewerComponent } from './project-viewer/project-viewer.component';

export const DashboardRoutes: Routes = [
  { path: 'home', component: DashboardComponent },
  { path: 'projects/:id/evaluation', component: ProjectViewerComponent }
];
