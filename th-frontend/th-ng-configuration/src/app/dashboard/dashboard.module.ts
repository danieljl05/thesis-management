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

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ChartistModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [DashboardComponent, AnnuityComponent, UserComponent, ProjectComponent, EvaluationComponent]
})
export class DashboardModule {}
