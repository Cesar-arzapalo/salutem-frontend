import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.page.html',
  styleUrls: ['./pruebas.page.scss'],
})
export class PruebasPage implements OnInit {
  descripcion: string;
  textButton: string;
  constructor() {
    this.descripcion = 'Deseas hacerte una prueba para descartar un posible contagio?';
    this.textButton = 'Empezar el triaje';
  }

  ngOnInit() {
  }

}
