import { TestBed } from '@angular/core/testing';

import { SubAreaService } from './sub-area.service';

describe('SubAreaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubAreaService = TestBed.get(SubAreaService);
    expect(service).toBeTruthy();
  });
});
