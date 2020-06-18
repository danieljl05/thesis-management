import { Injectable } from '@angular/core';
import { ConfigurationCommonsService } from './configuration-commons.service';
import { Project } from 'th-ng-commons';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends ConfigurationCommonsService {

  public get url(): string {
    return this.urlCofig + 'projects/'
  }

  save(project: Project, evaluatorId) {
    return this.http.post(this.url, { project, evaluatorId });
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

  getEvaluator(projectId) {
    return this.http.get(this.url + projectId + '/evaluator');
  }

}
