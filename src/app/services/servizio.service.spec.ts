import { TestBed } from '@angular/core/testing';

import { ServizioService } from './servizio.service';

describe('ServizioService', () => {
  let service: ServizioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServizioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
