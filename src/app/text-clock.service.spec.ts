import { TestBed } from '@angular/core/testing';

import { TextClockService } from './text-clock.service';

describe('TextClockService', () => {
  let service: TextClockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextClockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
