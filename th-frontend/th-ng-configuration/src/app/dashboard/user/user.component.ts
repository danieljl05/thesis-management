import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatPaginator } from '@angular/material';
import { Path, User} from 'th-ng-commons';
import { UserService} from '../../services/user.service';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  ready: boolean = false;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['position', 'name', 'email', 'actions'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private userService: UserService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getData() {
    this.userService.getAll().subscribe((users: User[]) => {
      let i = 1;
      const data: any[] = [];
      
      for (const a of users) {
        const obj = Object.assign({ position: 0 }, a);
        obj.position = i;
        data.push(obj);
        i++;
      }
      this.initData(data);
    }, error => {
      this.toastr.error('Ha ocurrido un error');
      console.error(error);
    });
  }

  initData(data: any[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.ready = true;
  }

  delete(id) {
    this.userService.delete(id).subscribe(res => {
      if (res['deleted']) {
        this.toastr.success('Usuario eliminado correctamente');
        this.getData();
      } else {
        this.toastr.warning('No es posible eliminar el usuario');
      }
    }, error => this.toastr.warning('No es posible eliminar el usuario'));
  }

  public get lPath(): Path[] {
    return [{ isActive: true, label: 'Usuario', url: '' }];
  }

}
