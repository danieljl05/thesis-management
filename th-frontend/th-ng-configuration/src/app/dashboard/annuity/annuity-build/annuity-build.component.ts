import { Component, OnInit } from '@angular/core';
import { Path, Annuity } from 'th-ng-commons';
import { ActivatedRoute } from '@angular/router';
import { AnnuityService } from '../../../services/annuity.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-annuity-build',
  templateUrl: './annuity-build.component.html',
  styleUrls: ['./annuity-build.component.css']
})
export class AnnuityBuildComponent {

  id: number;
  annuity: Annuity;
  ready: boolean = false;
  annuityForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private annuityService: AnnuityService
  ) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getAnnuity();
    });
  }

  getAnnuity() {
    if (this.id) {
      this.annuityService.getById(this.id).subscribe((annuity: Annuity) => {
        this.annuity = annuity;
        this.initForm();
      });
    } else {
      this.initForm();
      this.annuity = new Annuity();
    }
  }

  public get title(): string {
    return this.annuity && this.annuity.name ? 'Anualidad ' + this.annuity.name : 'Crear anualidad';
  }

  initForm() {
    this.annuityForm = new FormGroup({
      name: new FormControl(this.annuity ? this.annuity.name : '', [Validators.required]),
      active: new FormControl(this.annuity ? this.annuity.active : false, [Validators.required]),
    });
    this.ready = true;
  }

  onSubmit() {
    const formData = this.annuityForm.value;
    this.annuity.name = formData.name;
    this.annuity.active = formData.active;
    delete this.annuity['evaluationConfigList'];
    this.annuityService.save(this.annuity).subscribe((annuity: Annuity) => {
      this.annuity = annuity;
      this.toastr.success('Anualidad guardada correctamente');
      this.initForm();
    }, error => this.toastr.error('Ha ocurrido un error inesperado'));
  }

  public get lPath(): Path[] {
    const lPath: Path[] = [
      { isActive: false, label: 'Listado anualidades', url: '/annuity' },
      { isActive: true, label: this.title, url: '' }
    ];
    return lPath;
  }

}
