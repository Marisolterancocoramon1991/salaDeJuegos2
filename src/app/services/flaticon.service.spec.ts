import { TestBed } from '@angular/core/testing';

import { FlaticonService } from './flaticon.service';

describe('FlaticonService', () => {
  let service: FlaticonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlaticonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
