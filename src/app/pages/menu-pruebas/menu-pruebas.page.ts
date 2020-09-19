import { Component, OnInit } from '@angular/core';
import { Prueba } from '../../models/prueba.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-pruebas',
  templateUrl: './menu-pruebas.page.html',
  styleUrls: ['./menu-pruebas.page.scss'],
})
export class MenuPruebasPage implements OnInit {
  pruebas: Prueba[];
  cantidadCompletos: number;

  constructor(private route: Router) {
    console.log(route);
    this.pruebas = [
      new Prueba('fas fa-thermometer', 'Sintomas', false, 'sintomas', route.url),
      new Prueba('fas fa-hands-helping', 'Contacto estrecho', false, 'contacto-estrecho', route.url),
      new Prueba('fas fa-exclamation-triangle', 'Nivel de riesgo', false, 'nivel-riesgo', route.url)
    ];
    this.cantidadCompletos = 0;
    console.log(this.cantidadCompletos, this.pruebas.length);
   }

  ngOnInit() {
  }

}
