import { Component } from '@angular/core';
import { Project, Path, EProgram, EvaluationConfig, Annuity } from 'th-ng-commons';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EvaluationService } from '../../services/evaluation.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-project-viewer',
  templateUrl: './project-viewer.component.html',
  styleUrls: ['./project-viewer.component.css']
})
export class ProjectViewerComponent {

  id: number;
  ready = false;
  project: Project;

  annuity: Annuity;
  evaluationForm: FormGroup;
  lEvaluationItem: any[];
  evaluationConfig: EvaluationConfig;

  constructor(
    private evaluationService: EvaluationService,
    private projectService: ProjectService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getProjectInfo();
    });
  }

  public get projectName(): string {
    return this.project ? this.project.name : "Proyecto";
  }

  public get programName(): string {
    if (this.project) {
      const program = EProgram.list.find(p => p.toString() == this.project.program_id.toString());
      if (program) return program.value;
    }
    return "";
  }

  get items(): FormArray {
    return this.evaluationForm.get('items') as FormArray;
  }

  public get score(): number {
    let result = null;
    if (this.items) {
      result = this.items.controls.map(item => item.value).reduce((total, item) => {
        const score = typeof item.score === 'number' ? item.score : 0;
        return total + (score * (item.percentage / 100));
      }, 0);
    }
    return result > 0 ? result : null;
  }


  getProjectInfo() {
    this.projectService.getById(this.id).subscribe((project: Project) => {
      this.project = project;
      this.getEvaluationConfig();
    }, error => this.toastr.error('Ha ocurrido un error inesperado, por favor, inténtalo de nuevo más tarde'));
  }

  getEvaluationConfig() {
    this.evaluationService.getCurrentConfig().subscribe(evaluationResponse => {
      this.handleEvaluationData(evaluationResponse);
    })
  }

  /**
   * Transforms the response data 
   * @param evaluationResponse 
   */
  handleEvaluationData(evaluationResponse) {
    let evItems = [];
    let evaluationConfig = new EvaluationConfig();
    // access object propertys - also, you can use evaluationResponse.evaluationConfig
    evaluationConfig = evaluationResponse['evaluationConfig'] ? evaluationResponse['evaluationConfig'] : new EvaluationConfig();
    delete evaluationResponse['evaluationConfig'];
    if (evaluationConfig && evaluationConfig['evItems']) {
      evItems = evaluationConfig['evItems'];
      delete evaluationConfig['evItems'];
    }
    this.evaluationConfig = evaluationConfig;
    this.annuity = evaluationResponse;
    this.initForm(evItems);
  }

  initForm(evItems) {
    this.projectService.getEvaluation(this.project.id).subscribe((scoreResponse: any[]) => {
      evItems.forEach(ei => {
        const scoreRecord = scoreResponse.find(sr => sr.eva_item_id == ei.id);
        ei.evId = scoreRecord.id;
        ei.score = scoreRecord ? scoreRecord.score : null;
      });
      this.lEvaluationItem = evItems;
      this.buildForm();
    });
  }

  buildForm() {
    this.evaluationForm = this.fb.group({
      approved: this.fb.control(this.annuity ? this.project.state == 2 : false, [Validators.required]),
      items: this.fb.array([], [Validators.required])
    });
    if (this.lEvaluationItem) {
      for (const evItem of this.lEvaluationItem) {
        this.addNewItem(evItem);
      }
    }
    this.evaluationForm.disable()
    this.ready = true;
  }

  addNewItem(item?: any) {
    this.items.push(
      this.fb.group({
        id: item ? item.evId ? item.evId : null : null,
        evaluationItemId: item ? item.id : null,
        name: item ? item.name : '',
        percentage: item ? item.percentage : 0,
        score: this.fb.control(item ? item.score : '', [Validators.required, Validators.min(0), Validators.max(5)]),
      })
    );
  }

  getUpdateEvaluationList(items: any[]): any[] {
    return items.filter(i => i.id).map(i => {
      return {
        id: i.id,
        project_id: this.project.id,
        eva_item_id: i.evaluationItemId,
        score: i.score
      };
    });
  }

  getNewEvaluationList(items: any[]): any[] {
    return items.filter(i => !i.id).map(i => {
      return {
        project_id: this.project.id,
        eva_item_id: i.evaluationItemId,
        score: i.score
      };
    });
  }

  public get lPath(): Path[] {
    return [{ isActive: true, label: 'Proyecto', url: '' }];
  }
}
