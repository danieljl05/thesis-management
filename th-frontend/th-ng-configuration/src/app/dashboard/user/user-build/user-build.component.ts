import { Component } from '@angular/core';
import { Path, User } from 'th-ng-commons';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserRequest} from '../../../interfaces/user-request';

@Component({
  selector: 'app-user-build',
  templateUrl: './user-build.component.html',
  styleUrls: ['./user-build.component.css']
})
export class UserBuildComponent {

  id: number;
  ready: boolean;
  user: User;
  userForm: FormGroup;
  areEvItemsDisabled: boolean;


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
      this.getUser();
    });
  }

  /**
   * Get methods are better than normal methods when you call them in the html template for validate or render
   */
  get title(): string {
    return this.user && this.user.name ? 'Usuario ' + this.user.name : 'Crear Usuario';
  }

  


  /**
   * If the route has any id number it set the info
   */
  getUser() {
    this.ready = false;
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
   * Transforms the response data 
   * @param userResponse 
   */
 
  handleData(userResponse) {
    
    // access object propertys - you can use annuityResponse.evaluationConfig
 
    this.user = userResponse;
  }
  initForm() {
    this.userForm = this.fb.group({
      name: this.fb.control(this.user ? this.user.name : '', [Validators.required]),
      email: this.fb.control(this.user ? this.user.email : '', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
      role: this.fb.control(this.user ? this.user.role : '', [Validators.required]),
    });
    
    this.ready = true;
  }

  onSubmit() {
    this.prepareData();
    const userRequest: UserRequest = {
      user: this.user
      
    };
    this.saveUser(userRequest);
  }

  prepareData() {
    this.user.name = this.userForm.value.name;
    this.user.email = this.userForm.value.email;
    this.user.password = this.userForm.value.password;
    this.user.role = this.userForm.value.role;
   
    
  }

  saveUser(userRequest: UserRequest) {
    this.userService.save(userRequest).subscribe((userResponse) => {
      this.handleData(userResponse);
      this.toastr.success('Usuario guardado correctamente');
      this.initForm();
    }, error => this.toastr.error('Ha ocurrido un error inesperado'));
  }


 

  

  public get lPath(): Path[] {
    const lPath: Path[] = [
      { isActive: false, label: 'Listado usuarios', url: '/users' },
      { isActive: true, label: this.title, url: '' }
    ];
    return lPath;
  }
}
