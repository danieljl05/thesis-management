import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThNgCommonsComponent } from './th-ng-commons.component';

describe('ThNgCommonsComponent', () => {
  let component: ThNgCommonsComponent;
  let fixture: ComponentFixture<ThNgCommonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThNgCommonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThNgCommonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
