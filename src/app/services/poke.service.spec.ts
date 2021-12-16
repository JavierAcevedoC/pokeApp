import { TestBed } from '@angular/core/testing';

import { PokeServiceService } from './poke.service';

describe('PokeServiceService', () => {
  let service: PokeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
