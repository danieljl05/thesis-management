import { Component } from '@angular/core';
import { Path, User, ERole, Program } from 'th-ng-commons';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserRequest } from '../../../interfaces/user-request';

@Component({
  selector: 'app-user-build',
  templateUrl: './user-build.component.html',
  styleUrls: ['./user-build.component.css']
})
export class UserBuildComponent {

  id: number;
  user: User;
  ready: boolean;
  userForm: FormGroup;
  programList: Program[];
  areEvItemsDisabled: boolean;
  passwordIsGonnaChange = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService
  ) {
    this.ready = false;
    this.areEvItemsDisabled = false;
    // Each time that the route params changes it makes the request and build the component logic     
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.initData();
    });
  }

  initData() {
    this.userService.getPrograms().subscribe((programs: Program[]) => {
      this.programList = programs && programs.length > 0 ? programs : [];
      this.getUser();
    });
  }

  get title(): string {
    return this.user && this.user.name ? 'Usuario ' + this.user.name : 'Crear Usuario';
  }

  get roleList(): ERole[] {
    return ERole.list.filter(r => r.key != ERole.ADMIN.key);
  }

  get passwordsMatch(): boolean {
    return this.userForm.get('password').value == this.userForm.get('password_confirmation').value;
  }

  /**
   * If the route has any id number it set the info
   */
  getUser() {
    this.passwordIsGonnaChange = false;
    if (this.id) {
      this.userService.getById(this.id).subscribe(userResponse => {
        this.handleData(userResponse);
        this.initForm();
      });
    } else {
      this.initForm();
      this.user = new User();
    }
  }

  /**
   * Transforms the data response 
   * @param userResponse 
   */
  handleData(userResponse) {
    this.user = userResponse;
  }

  initForm() {
    const userProgramsId = this.user ? this.user.programs.map(p => p.id.toString()) : [];
    this.userForm = this.fb.group({
      id: this.fb.control(this.user ? this.user.id : ''),
      name: this.fb.control(this.user ? this.user.name : '', [Validators.required]),
      email: this.fb.control(this.user ? this.user.email : '', [Validators.required]),
      password: this.fb.control('', [Validators.minLength(2)]),
      password_confirmation: this.fb.control(''),
      programs: this.fb.control(userProgramsId, [Validators.required]),
      role: this.fb.control(this.user ? this.user.role.toString() : '', [Validators.required]),
    });
    this.ready = true;
  }

  onSubmit() {
    const userRequest = this.prepareData();
    this.saveUser(userRequest);
  }

  prepareData(): UserRequest {
    const user = {
      id: this.userForm.value.id,
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      role: this.userForm.value.role,
      password: this.userForm.value.password,
    };
    const programsId = this.userForm.get('programs').value;
    if (!this.userForm.value.password) {
      delete user.password;
    }
    return { user, programsId };
  }

  saveUser(userRequest: UserRequest) {
    this.userService.save(userRequest).subscribe((userResponse: any) => {
      this.id = userResponse.user.id;
      this.getUser();
      this.toastr.success('Usuario guardado correctamente');
    }, error => this.toastr.error('Ha ocurrido un error inesperado'));
  }

  onChangePassword(e) {
    this.passwordIsGonnaChange = e.checked;
    if (this.passwordIsGonnaChange) {
      this.userForm.get('password').setValidators([Validators.required]);
    } else {
      this.userForm.get('password').clearValidators();
    }
    this.userForm.get('password').updateValueAndValidity();
  }

  public get lPath(): Path[] {
    const lPath: Path[] = [
      { isActive: false, label: 'Listado usuarios', url: '/users' },
      { isActive: true, label: this.title, url: '' }
    ];
    return lPath;
  }
}
