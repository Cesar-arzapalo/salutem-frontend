import { Component, OnInit, Output } from '@angular/core';
import { PreguntasService } from '../../services/preguntas.service';
import { PreguntaModel } from '../../models/pregunta.model';
import { CuestionarioModel } from '../../models/cuestionario.model';

@Component({
  selector: 'app-triaje',
  templateUrl: './triaje.page.html',
  styleUrls: ['./triaje.page.scss'],
})
export class TriajePage implements OnInit {

  preguntas: PreguntaModel[];
  cuestionarios: CuestionarioModel[];

  paginaActual: number;
  cantidadCuestionarios: number;

  loading: boolean;


  constructor(private preguntaServices: PreguntasService) {
    this.inicializarDatos();
  }

  inicializarDatos = () => {
    this.paginaActual = 1;
    this.cantidadCuestionarios = 5;
    this.loading = true;
  }

  ngOnInit() {
    this.preguntaServices.getPreguntas()
          .subscribe( (resp) => {
            this.preguntas = resp;
            this.cuestionarios = this.generarCuestionarios(resp);
          });
  }

  private generarCuestionarios = (preguntas: PreguntaModel[]): CuestionarioModel[] => {
    const cuestionarios: CuestionarioModel[] = [];

    for (let i = 1; i <= this.cantidadCuestionarios ; i += 1){

      const pregungtasXCuestionario: PreguntaModel[] = preguntas.filter( pregunta => pregunta.nroPagina === i );

      const completados: boolean[] = [];
      for (let j = 1; j <= pregungtasXCuestionario.length ; j += 1){
        completados.push(false);
      }

      cuestionarios.push(new CuestionarioModel(pregungtasXCuestionario , completados, 0, i));
    }

    this.loading = false;

    return cuestionarios;
  }

  actualizarPagina(nuevaPagina: number){
    this.paginaActual = nuevaPagina;
  }

}
