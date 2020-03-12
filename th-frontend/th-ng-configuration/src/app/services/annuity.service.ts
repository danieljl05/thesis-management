import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Annuity } from 'th-ng-commons';

@Injectable({
  providedIn: 'root'
})
export class AnnuityService {

  constructor(private http: HttpClient) { }

  public get url(): string {
    return environment.host.backend.th_lm_configuration;
  }

  save(annuity: Annuity) {
    return this.http.post(this.url + 'annuity/save', annuity);
  }

  getAll() {
    return this.http.get(this.url + 'annuity');
  }

  getById(id: number) {
    return this.http.get(this.url + 'annuity/' + id);
  }
}
