import { TestBed } from '@angular/core/testing';

import { TickServiceService } from './tick-service.service';

describe('TickServiceService', () => {
  let service: TickServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TickServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
