import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../services/project.service';
import { Project } from 'th-ng-commons';


@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	project: Project;

	public get hasProject(): boolean {
		if (typeof this.project !== 'undefined' && this.project) {
			return Object.values(this.project).length > 0;
		}
		return false;
	}

	constructor(
		private projectService: ProjectService,
		private toastr: ToastrService,
	) {
		this.project = null;
	}

	projectChosen(hasBeenChosen) {
		if (hasBeenChosen)
			this.init();
	}

	ngOnInit() {
		this.init();
	}

	init() {
		this.projectService.getCurrentProject().subscribe((response: Project) => {
			this.project = response;
			if (this.hasProject) {
				this.goToViewer();
			}
		}, error => {
			this.toastr.error('Se ha producido un error inesperado, por favor, inténtalo de nuevo más tarde');
		});
	}

	goToViewer() {
		const a = document.createElement('a');
		a.href = 'projects/' + this.project.id + '/evaluation';
		a.click();
		a.remove();
	}
}
