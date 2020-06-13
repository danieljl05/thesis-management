import { Component, OnInit, Input } from '@angular/core';
import { Project, Path } from 'th-ng-commons';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-viewer',
  templateUrl: './project-viewer.component.html',
  styleUrls: ['./project-viewer.component.css']
})
export class ProjectViewerComponent implements OnInit {

  @Input()
  project: Project;

  ready = false;

  public get projectName(): string {
    return this.project ? this.project.name : "Proyecto";
  }

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.ready = true;
  }

  public get lPath(): Path[] {
    return [{ isActive: true, label: 'Proyecto', url: '' }];
  }
}
