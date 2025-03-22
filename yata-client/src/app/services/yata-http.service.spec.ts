import { TestBed } from '@angular/core/testing';

import { YataHttpService } from './yata-http.service';

describe('YataHttpService', () => {
  let service: YataHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YataHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
