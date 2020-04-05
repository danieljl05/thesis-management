import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { BreadcrumbComponent } from '../layouts/full/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    BreadcrumbComponent
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    BreadcrumbComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule
  ],
  providers: [MenuItems]
})
export class SharedModule { }
