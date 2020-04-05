import { Injectable } from '@angular/core';
import { Annuity } from 'th-ng-commons';
import { ConfigurationCommonsService } from './configuration-commons.service';

@Injectable({
  providedIn: 'root'
})
export class AnnuityService extends ConfigurationCommonsService {

  public get url(): string {
    return this.urlCofig + 'annuities/'
  }

  save(annuity: Annuity) {
    return this.http.post(this.url, annuity);
  }

  getAll() {
    return this.http.get(this.url);
  }

  getById(id: number) {
    return this.http.get(this.url + id);
  }

  delete(id: number) {
    return this.http.delete(this.url + id);
  }
}
