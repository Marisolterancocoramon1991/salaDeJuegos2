import { TestBed } from '@angular/core/testing';

import { ImagenMoeriaService } from './imagen-moeria.service';

describe('ImagenMoeriaService', () => {
  let service: ImagenMoeriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagenMoeriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
