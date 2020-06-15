import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { ChartistModule } from 'ng-chartist';
import { ProjectComponent } from './project/project.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectViewerComponent } from './project-viewer/project-viewer.component';

@NgModule({
  imports: [
    RouterModule.forChild(DashboardRoutes),
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ChartistModule,
    SharedModule,
  ],
  declarations: [
    DashboardComponent,
    ProjectComponent,
    ProjectViewerComponent
  ]
})
export class DashboardModule { }
