import { Component, OnInit, HostListener } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('mensaje', { static: false }) mensajeInput!: ElementRef;
  messages: any[] = [];
  colorClasses = ['color-blue', 'color-green', 'color-pink']; // Agrega más clases de color aquí si es necesario
  randomColorClass: string;
  containerPosition = { left: 0, top: 0 };
  isDragging = false;
  offsetX = 0;
  offsetY = 0;

  constructor(private chatService: ChatService, private router: Router) {
    const randomIndex = Math.floor(Math.random() * this.colorClasses.length);
    this.randomColorClass = this.colorClasses[randomIndex];
  }

  ngOnInit(): void {
    this.obtenerMensajes();
  }

  enviarMensaje() {
    this.chatService.enviarMensaje(this.mensajeInput.nativeElement.value, "kervin@gmail.com")
      .then(() => {
        this.obtenerMensajes();
        this.mensajeInput.nativeElement.value = '';
      })
      .catch(error => console.error('Error enviando mensaje:', error));
  }

  obtenerMensajes() {
    this.chatService.obtenerMensajes().subscribe((messages: any[]) => {
      this.messages = messages;
    });
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.offsetX = event.clientX - this.containerPosition.left;
    this.offsetY = event.clientY - this.containerPosition.top;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      const x = event.clientX - this.offsetX;
      const y = event.clientY - this.offsetY;
      this.containerPosition = { left: x, top: y };
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
  }
}
