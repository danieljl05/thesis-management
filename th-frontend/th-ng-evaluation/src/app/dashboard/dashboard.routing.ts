import { Routes } from '@angular/router';

import { ProjectComponent } from './project/project.component';
import { ProjectViewerComponent } from './project-viewer/project-viewer.component';

export const DashboardRoutes: Routes = [
  { path: 'projects', component: ProjectComponent },
  { path: 'projects/evaluate/:id', component: ProjectViewerComponent }
];
