import { TestBed } from '@angular/core/testing';

import { FormatInterceptor } from './format.interceptor';

describe('FormatInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FormatInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: FormatInterceptor = TestBed.inject(FormatInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
