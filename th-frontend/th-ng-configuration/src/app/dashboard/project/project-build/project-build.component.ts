import { Component, OnInit } from '@angular/core';
import { Project, Path, Program } from 'th-ng-commons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-project-build',
  templateUrl: './project-build.component.html',
  styleUrls: ['./project-build.component.css']
})
export class ProjectBuildComponent {


  id: number;
  ready: boolean;
  project: Project;
  programList: Program[];
  projectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService,
    private projectService: ProjectService
  ) {
    // this.ready = false;
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.initData();
    });
  }

  get title(): string {
    return this.project && this.project.description ? 'Proyecto ' + this.project.description : 'Crear proyecto';
  }

  initData() {
    this.userService.getPrograms().subscribe((programs: Program[]) => {
      this.programList = programs && programs.length > 0 ? programs : [];
      this.getProject();
    });

  }

  getProject() {
    if (this.id) {
      this.projectService.getById(this.id).subscribe(projectResponse => {
        this.handleData(projectResponse);
        this.initForm();
      });
    } else {
      this.initForm();
      this.project = new Project();
    }
  }

  /**
   * Transforms the data response 
   * @param userResponse
   */
  handleData(userResponse) {
    this.project = userResponse;
  }

  initForm() {
    this.projectForm = this.fb.group({
      id: this.fb.control(this.project ? this.project.id : ''),
      name: this.fb.control(this.project ? this.project.name : '', [Validators.required]),
      description: this.fb.control(this.project ? this.project.description : '', [Validators.required]),
      program_id: this.fb.control(this.project ? this.project.program_id.toString() : '', [Validators.required])
    });
    this.ready = true;
  }

  onSubmit() {
    this.prepareData();
    this.saveProject();
  }

  prepareData() {
    if (!this.project) {
      this.project = new Project();
    }
    const projectData = this.projectForm.value;
    this.project.name = projectData.name;
    this.project.program_id = projectData.program_id;
    this.project.description = projectData.description;
  }

  saveProject() {
    this.projectService.save(this.project).subscribe((project: Project) => {
      this.handleData(project);
      this.initForm();
      this.toastr.success('Proyecto guardado correctamente');
    }, error => this.toastr.error('Ha ocurrido un error inesperado'));
  }

  public get lPath(): Path[] {
    const lPath: Path[] = [
      { isActive: false, label: 'Listado proyectos', url: '/projects' },
      { isActive: true, label: this.title, url: '' }
    ];
    return lPath;
  }

}
