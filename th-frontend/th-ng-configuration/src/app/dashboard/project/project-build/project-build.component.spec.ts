import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBuildComponent } from './project-build.component';

describe('ProjectBuildComponent', () => {
  let component: ProjectBuildComponent;
  let fixture: ComponentFixture<ProjectBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
