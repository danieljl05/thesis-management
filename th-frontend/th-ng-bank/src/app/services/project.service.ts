import { Injectable } from '@angular/core';
import { BankCommonsService } from './bank-commons.service';
import { Project } from 'th-ng-commons';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BankCommonsService {

  public get url(): string {
    return this.urlBank + 'projects/'
  }

  save(project: Project) {
    return this.http.post(this.url, project);
  }

  getProjects() {
    return this.http.get(this.url);
  }

  getById(id: number) {
    return this.http.get(this.url + id);
  }

  delete(id: number) {
    return this.http.delete(this.url + id);
  }

  getCurrentProject() {
    return this.http.get(this.url + 'current')
  }

  chooseProject(id) {
    return this.http.post(this.url + id + '/choose', {})
  }

  getEvaluation(id: number) {
    return this.http.get(this.urlEvaluation + 'projects/' + id + '/evaluation');
  }
}
