import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrengthValuesComponent } from './strength-values.component';

describe('StrengthValuesComponent', () => {
  let component: StrengthValuesComponent;
  let fixture: ComponentFixture<StrengthValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StrengthValuesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrengthValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
