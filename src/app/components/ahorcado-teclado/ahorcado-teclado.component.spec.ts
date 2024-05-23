import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorcadoTecladoComponent } from './ahorcado-teclado.component';

describe('AhorcadoTecladoComponent', () => {
  let component: AhorcadoTecladoComponent;
  let fixture: ComponentFixture<AhorcadoTecladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AhorcadoTecladoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AhorcadoTecladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
