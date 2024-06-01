import { TestBed } from '@angular/core/testing';

import { TickLogicService } from './tick-logic.service';

describe('TickLogicService', () => {
  let service: TickLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TickLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
