import { Injectable } from '@angular/core';
import { EvaluationCommonsService } from './evaluation-commons.service';
import { Project } from 'th-ng-commons';
import { EvaluationRequest } from '../interfaces/evaluation-request';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends EvaluationCommonsService {

  public get url(): string {
    return this.urlEvaluation + 'projects/'
  }

  getProjects() {
    return this.http.get(this.url);
  }

  getEvaluation(id: number) {
    return this.http.get(this.url + id + '/evaluation');
  }

  doEvaluation(evaluationRequest: EvaluationRequest) {
    return this.http.post(this.url + 'evaluate', evaluationRequest);
  }

  getById(id: number) {
    return this.http.get(this.urlCofig + 'projects/' + id);
  }
}
