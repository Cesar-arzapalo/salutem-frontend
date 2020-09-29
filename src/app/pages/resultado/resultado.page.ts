import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.page.html',
  styleUrls: ['./resultado.page.scss'],
})
export class ResultadoPage implements OnInit {
  cantidad: number;
  nivelTriaje: number;
  mensaje: string[];

  constructor(private router: ActivatedRoute) {

    this.mensaje =
    ['Eres una persona que posee SARS-CoV2, requieres de atención inmediata. tu condición clínica representa un riesgo vital',
      'Eres una persona que posee SARS-CoV2, tu condicion puede evolucionar hacia un rápido deterioro, nesecitas atencion medica urgente',
      'Eres un posible caso de SARS-CoV2, tu condición clínica requiere de medidas diagnósticas urgente para descartar',
      'Eres un posible caso de SARS-CoV2, pero tu condición clínica no requiere de medidas diagnósticas urgente para descartarlo',,
      'No eeres un posible caso de SARS-CoV2, no es necesario que hagas un descarte'];
  }

  ngOnInit() {
    this.cantidad = this.router.snapshot.params.id;
    this.definirNivel(this.cantidad);
  }

  definirNivel(minutos: number){
    if (minutos <= 15){
      this.nivelTriaje = 1;
    }else if (minutos <= 60){
      this.nivelTriaje = 2;
    }else if (minutos <= 120){
      this.nivelTriaje = 3;
    }else if (minutos <= 240){
      this.nivelTriaje = 4;
    }else {
      this.nivelTriaje = 5;
    }

  }

}
