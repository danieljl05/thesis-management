import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { ChartistModule } from 'ng-chartist';
import { AnnuityComponent } from './annuity/annuity.component';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { SharedModule } from '../shared/shared.module';
import { AnnuityBuildComponent } from './annuity/annuity-build/annuity-build.component';
import { UserBuildComponent } from './user/user-build/user-build.component';

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
    AnnuityComponent,
    UserComponent,
    ProjectComponent,
    EvaluationComponent,
    AnnuityBuildComponent,
    UserBuildComponent
  ]
})
export class DashboardModule { }
