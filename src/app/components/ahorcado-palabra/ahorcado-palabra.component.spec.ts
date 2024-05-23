import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorcadoPalabraComponent } from './ahorcado-palabra.component';

describe('AhorcadoPalabraComponent', () => {
  let component: AhorcadoPalabraComponent;
  let fixture: ComponentFixture<AhorcadoPalabraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AhorcadoPalabraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AhorcadoPalabraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
