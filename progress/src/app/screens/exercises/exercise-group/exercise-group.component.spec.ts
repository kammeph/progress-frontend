import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseGroupComponent } from './exercise-group.component';

describe('ExerciseGroupComponent', () => {
  let component: ExerciseGroupComponent;
  let fixture: ComponentFixture<ExerciseGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
