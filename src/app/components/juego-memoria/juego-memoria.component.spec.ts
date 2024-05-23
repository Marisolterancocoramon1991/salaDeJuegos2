import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoMemoriaComponent } from './juego-memoria.component';

describe('JuegoMemoriaComponent', () => {
  let component: JuegoMemoriaComponent;
  let fixture: ComponentFixture<JuegoMemoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegoMemoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JuegoMemoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
