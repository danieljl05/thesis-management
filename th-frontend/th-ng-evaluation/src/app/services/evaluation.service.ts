import { Injectable } from '@angular/core';
import { EvaluationCommonsService } from './evaluation-commons.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService extends EvaluationCommonsService {

  public get url(): string {
    return this.urlEvaluation + 'projects/'
  }


  getCurrentConfig() {
    return this.http.get(this.urlCofig + 'evaluation-config');
  }


}
