import { Component, OnInit } from '@angular/core';
import { Path, Annuity } from 'th-ng-commons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-annuity-build',
  templateUrl: './annuity-build.component.html',
  styleUrls: ['./annuity-build.component.css']
})
export class AnnuityBuildComponent implements OnInit {

  id: number;
  annuity: Annuity;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getAnnuity();
    });
  }

  ngOnInit() {
    // this.getAnnuity(); 
  }

  getAnnuity() {
    if (!this.id) return;

  }


  public get title(): string {
    return this.annuity ? this.annuity.name : 'Crear anualidad';
  }


  public get lPath(): Path[] {
    const lPath: Path[] = [
      { isActive: false, label: 'Anualidad', url: '/annuity' },
      { isActive: true, label: this.title, url: '' }
    ];
    return lPath;
  }

}
