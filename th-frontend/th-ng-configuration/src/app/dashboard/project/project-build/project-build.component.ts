import { Component } from '@angular/core';
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
  evaluator: any;
  project: Project;
  evaluators: any[];
  evaluatorId: number;
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
    return this.project && this.project.name ? this.project.name : 'Crear proyecto';
  }

  initData() {
    this.userService.getPrograms().subscribe((programs: Program[]) => {
      this.programList = programs && programs.length > 0 ? programs : [];
      this.getProject();
    });
  }

  getProject() {
    if (this.id) {
      this.projectService.getById(this.id).subscribe((projectResponse: any) => {
        this.userService.getEvaluatorsByProgram(projectResponse.program_id).subscribe((evaluators: any[]) => {
          this.evaluators = evaluators && evaluators.length > 0 ? evaluators : [];
          this.projectService.getEvaluator(this.id).subscribe((evaluator: any[]) => {
            this.handleEvaluator(evaluator);
            this.handleData(projectResponse);
            this.initForm();
          });
        });
      });
    } else {
      this.initForm();
      this.project = new Project();
    }
  }

  handleEvaluator(ev: any[]) {
    this.evaluator = ev && ev.length > 0 ? ev[0] : null;
  }

  onChangeProgram(e) {
    this.userService.getEvaluatorsByProgram(e.value).subscribe((evaluators: any[]) => {
      this.evaluators = evaluators && evaluators.length > 0 ? evaluators : [];
      this.projectForm.get('evaluator').setValue(null);
      this.projectForm.get('evaluator').updateValueAndValidity();
    });
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
      evaluator: this.fb.control(this.evaluator ? this.evaluator.id.toString() : null, [Validators.required]),
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
    this.projectService.save(this.project, this.projectForm.value.evaluator).subscribe((project: Project) => {
      this.initData();
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
