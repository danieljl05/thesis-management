import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnuityBuildComponent } from './annuity-build.component';

describe('AnnuityBuildComponent', () => {
  let component: AnnuityBuildComponent;
  let fixture: ComponentFixture<AnnuityBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnuityBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnuityBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
