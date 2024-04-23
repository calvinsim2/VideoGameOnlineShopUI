import { TestBed } from '@angular/core/testing';

import { CodesTableService } from './codes-table.service';

describe('CodesTableService', () => {
  let service: CodesTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodesTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
