import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export abstract class ConfigurationCommonsService {

  constructor(protected http: HttpClient) { }

  abstract get url(): string;
  protected get urlCofig(): string {
    return environment.host.backend.th_lm_configuration;
  }
}
