import { Injectable } from '@angular/core';
import { User } from 'th-ng-commons';
import { ConfigurationCommonsService } from './configuration-commons.service';
import { UserRequest } from '../interfaces/user-request';
@Injectable({
  providedIn: 'root'
})
export class UserService extends ConfigurationCommonsService {

  public get url(): string {
    return this.urlCofig + 'users/'
  }

  save(userRequest: UserRequest) {
    return this.http.post(this.url, userRequest);
  }

  getAll() {
    return this.http.get(this.url);
  }

  getPrograms() {
    return this.http.get(this.urlCofig + 'programs');
  }

  getById(id: number) {
    return this.http.get(this.url + id);
  }

  delete(id: number) {
    return this.http.delete(this.url + id);
  }

  getEvaluatorsByProgram(programId: number) {
    return this.http.get(this.url + 'evaluators/' + programId)
  }
}
