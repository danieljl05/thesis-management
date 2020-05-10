import { Component } from '@angular/core';
import { Path, Annuity, EvaluationItem, EvaluationConfig } from 'th-ng-commons';
import { ActivatedRoute } from '@angular/router';
import { AnnuityService } from '../../../services/annuity.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AnnuityRequest } from '../../../interfaces/annuity-request';

@Component({
  selector: 'app-annuity-build',
  templateUrl: './annuity-build.component.html',
  styleUrls: ['./annuity-build.component.css']
})
export class AnnuityBuildComponent {

  id: number;
  ready: boolean;
  annuity: Annuity;
  annuityForm: FormGroup;
  areEvItemsDisabled: boolean;
  lEvaluationItem: EvaluationItem[];
  evaluationConfig: EvaluationConfig;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private annuityService: AnnuityService
  ) {
    this.ready = false;
    this.areEvItemsDisabled = false;
    // Each time that the route params changes it makes the request and build the component logic     
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getAnnuity();
    });
  }

  /**
   * Get methods are better than normal methods when you call them in the html template for validate or render
   */
  get title(): string {
    return this.annuity && this.annuity.name ? 'Anualidad ' + this.annuity.name : 'Crear anualidad';
  }

  get items(): FormArray {
    return this.annuityForm.get('items') as FormArray;
  }

  get arePercentagesValid(): boolean {
    let total = 0;
    for (const item of this.items.controls) {
      total += Number(item.value.percentage);
    }
    return (total == 100);
  }

  /**
   * If the route has any id number it set the info
   */
  getAnnuity() {
    this.ready = false;
    if (this.id) {
      this.annuityService.getById(this.id).subscribe(annuityResponse => {
        this.handleData(annuityResponse);
        this.initForm();
      });
    } else {
      this.initForm();
      this.annuity = new Annuity();
      this.evaluationConfig = new EvaluationConfig();
      this.lEvaluationItem = [];
    }
  }

  /**
   * Transforms the response data 
   * @param annuityResponse 
   */
  handleData(annuityResponse) {
    let evItems = [];
    let evaluationConfig = new EvaluationConfig();
    // access object propertys - you can use annuityResponse.evaluationConfig
    evaluationConfig = annuityResponse['evaluationConfig'] ? annuityResponse['evaluationConfig'] : new EvaluationConfig();
    delete annuityResponse['evaluationConfig'];
    if (evaluationConfig && evaluationConfig['evItems']) {
      evItems = evaluationConfig['evItems'];
      delete evaluationConfig['evItems'];
    }

    this.evaluationConfig = evaluationConfig;
    this.lEvaluationItem = evItems;
    this.annuity = annuityResponse;
  }

  initForm() {
    this.annuityForm = this.fb.group({
      name: this.fb.control(this.annuity ? this.annuity.name : '', [Validators.required]),
      active: this.fb.control(this.annuity ? this.annuity.active : false, [Validators.required]),
      items: this.fb.array([], [Validators.required])
    });
    if (this.lEvaluationItem) {
      for (const evItem of this.lEvaluationItem) {
        this.addNewItem(evItem);
      }
    }
    this.ready = true;
  }

  onSubmit() {
    this.prepareData();
    const annuityRequest: AnnuityRequest = {
      annuity: this.annuity,
      evaluationConfig: this.evaluationConfig,
      lEvaluationItem: this.lEvaluationItem
    };
    this.saveAnnuity(annuityRequest);
  }

  prepareData() {
    this.annuity.name = this.annuityForm.value.name;
    this.annuity.active = this.annuityForm.value.active;
    this.evaluationConfig.semester_id = this.annuity.id;
    // It returns data array
    this.lEvaluationItem = this.items.controls.map(item => item.value);
  }

  saveAnnuity(annuityRequest: AnnuityRequest) {
    this.annuityService.save(annuityRequest).subscribe((annuityResponse: any) => {
      this.handleData(annuityResponse);
      this.toastr.success('Anualidad guardada correctamente');
      this.id = annuityResponse.id;
      this.getAnnuity();
    }, error => this.toastr.error('Ha ocurrido un error inesperado'));
  }

  addNewItem(configurationItem?: any) {
    this.items.push(
      this.fb.group({
        id: configurationItem ? configurationItem.id : null,
        name: this.fb.control({ value: configurationItem ? configurationItem.name : '', disabled: this.areEvItemsDisabled }, [Validators.required]),
        percentage: this.fb.control({ value: configurationItem ? configurationItem.percentage : '', disabled: this.areEvItemsDisabled }, [Validators.required, Validators.min(1), Validators.max(100)])
      })
    );
  }

  removeAssistant(index) {
    this.items.removeAt(index);
  }

  showAddButton(i) {
    return (i == this.items.controls.length - 1);
  }

  public get lPath(): Path[] {
    const lPath: Path[] = [
      { isActive: false, label: 'Listado anualidades', url: '/annuities' },
      { isActive: true, label: this.title, url: '' }
    ];
    return lPath;
  }
}
