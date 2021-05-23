import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { LoadService } from './load.service';

describe('LoadService', () => {
  let service: LoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(LoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
