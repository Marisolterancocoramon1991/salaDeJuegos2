import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaFalsaComponent } from './ruta-falsa.component';

describe('RutaFalsaComponent', () => {
  let component: RutaFalsaComponent;
  let fixture: ComponentFixture<RutaFalsaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutaFalsaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RutaFalsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
