import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quien-soy',
  standalone: true,
  imports: [],
  templateUrl: './quien-soy.component.html',
  styleUrl: './quien-soy.component.css'
})
export class QuienSoyComponent {
  dragging = false;
  startY = 0;
  topOffset = 0;

  constructor(private router: Router){}
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.dragging) {
      this.topOffset = event.clientY - this.startY;
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.dragging = false;
  }

  startDrag(event: MouseEvent) {
    this.dragging = true;
    this.startY = event.clientY - this.topOffset;
  }
  goToHome() {
    this.router.navigate(['/home']);
  }

}
