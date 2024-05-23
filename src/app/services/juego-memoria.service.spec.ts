import { TestBed } from '@angular/core/testing';

import { JuegoMemoriaService } from './juego-memoria.service';

describe('JuegoMemoriaService', () => {
  let service: JuegoMemoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JuegoMemoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
