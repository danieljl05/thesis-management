import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../services/project.service';
import { Path } from 'th-ng-commons';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  ready: boolean = false;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['position', 'name', 'description', 'actions'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private toastr: ToastrService,
    private projectService: ProjectService) { }

  ngOnInit() {
    this.getData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getData() {
    this.projectService.getAll().subscribe((projects: any[]) => {
      const data = this.resolveData(projects);
      this.initData(data);
    }, error => {
      this.toastr.error('Ha ocurrido un error');
      console.error(error);
    });
  }

  resolveData(projects: any[]) {
    let i = 1;
    const data = [];
    projects = projects && projects.length > 0 ? projects : [];
    for (const p of projects) {
      p.position = i;
      data.push(p);
      i++;
    }
    return data;
  }

  initData(data: any[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.ready = true;
  }

  delete(id) {
    if (confirm('El elemento seleccionado será eliminado ¿deseas continuar?')) {
      this.projectService.delete(id).subscribe(res => {
        if (res['deleted']) {
          this.toastr.success('Proyecto eliminado correctamente');
          this.getData();
        } else {
          this.toastr.warning('No es posible eliminar el proyecto');
        }
      }, error => this.toastr.warning('No es posible eliminar el proyecto'));
    }
  }

  public get lPath(): Path[] {
    return [{ isActive: true, label: 'Proyectos', url: '' }];
  }
}
