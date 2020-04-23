import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBuildComponent } from './user-build.component';

describe('UserBuildComponent', () => {
  let component: UserBuildComponent;
  let fixture: ComponentFixture<UserBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
