import { Injectable } from '@angular/core';
import { BankCommonsService } from './bank-commons.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService extends BankCommonsService {

  public get url(): string {
    return this.urlEvaluation + 'projects/'
  }

  getCurrentConfig() {
    return this.http.get(this.urlCofig + 'evaluation-config');
  }
}
