import { TestBed } from '@angular/core/testing';

import { StrengthValueService } from './strength-value.service';

describe('StrengthValueService', () => {
  let service: StrengthValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrengthValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
