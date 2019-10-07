import { TestBed } from '@angular/core/testing';

import { ArjsService } from './arjs.service';

describe('ArjsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArjsService = TestBed.get(ArjsService);
    expect(service).toBeTruthy();
  });
});
