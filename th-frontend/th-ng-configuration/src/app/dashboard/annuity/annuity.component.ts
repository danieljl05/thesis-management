import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatPaginator } from '@angular/material';
import { Path, Annuity } from 'th-ng-commons';
import { AnnuityService } from '../../services/annuity.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-annuity',
  templateUrl: './annuity.component.html',
  styleUrls: ['./annuity.component.css']
})
export class AnnuityComponent implements OnInit {

  ready: boolean = false;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['position', 'name', 'active', 'actions'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private annuityService: AnnuityService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getData() {
    this.annuityService.getAll().subscribe((annuities: Annuity[]) => {
      let i = 1;
      const data: any[] = [];
      for (const a of annuities) {
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
    if (confirm('El elemento seleccionado será eliminado ¿deseas continuar?')) {
      this.annuityService.delete(id).subscribe(res => {
        if (res['deleted']) {
          this.toastr.success('Anualidad eliminada correctamente');
          this.getData();
        } else {
          this.toastr.warning('No es posible eliminar la anualidad');
        }
      }, error => this.toastr.warning('No es posible eliminar la anualidad'));
    }
  }

  public get lPath(): Path[] {
    return [{ isActive: true, label: 'Anualidad', url: '' }];
  }
}
