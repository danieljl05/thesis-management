import { Component, OnInit, Input } from '@angular/core';
import { Path } from 'th-ng-commons';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {

  @Input() lPath: Path[];

  constructor() { }

  getFullPath(): Path[] {
    if (!this.lPath) return [];
    return this.lPath.filter(p => !p.isActive);
  }

  public get activePath(): Path {
    if (!this.lPath) return null;
    return this.lPath.find(p => p.isActive);
  }
}
