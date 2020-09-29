import { Component, OnInit, Output } from '@angular/core';
import { PreguntasService } from '../../services/preguntas.service';
import { PreguntaModel } from '../../models/pregunta.model';
import { CuestionarioModel } from '../../models/cuestionario.model';
import { AnalisisCuestionarioModel } from '../../models/AnalizasCuestionario.model';
import { XFuzzyService } from '../../services/xfuzzy.service';

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

  triaje: AnalisisCuestionarioModel[];

  loading: boolean;


  constructor(private preguntaServices: PreguntasService, private xFuzzyService: XFuzzyService) {
    this.inicializarDatos();
  }

  inicializarDatos = () => {
    this.paginaActual = 1;
    this.cantidadCuestionarios = 5;
    this.loading = true;
    this.triaje = [
      new AnalisisCuestionarioModel([0, 0, 0, 0], 1),
      new AnalisisCuestionarioModel([0, 0, 0, 0], 2),
      new AnalisisCuestionarioModel([0, 0, 0, 0], 3),
      new AnalisisCuestionarioModel([0, 0, 0, 0], 4),
      new AnalisisCuestionarioModel([0, 0, 0, 0], 5)
    ];
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

  realizarTriaje(datosTriajeXCuestionario: AnalisisCuestionarioModel){
    this.triaje[(datosTriajeXCuestionario.nroPagina - 1)] = datosTriajeXCuestionario;
    const resultado =  this.analizarTriaje(datosTriajeXCuestionario.nroPagina);
    console.log(resultado);
  }

  private analizarTriaje(nroPagina: number){
    let cantidad: number;
    let gravedad: number;
    let contacto: number;
    let riesgo: number;

    for (let i = 0; i < nroPagina; i += 1){
      cantidad = this.triaje[i][0];
      gravedad = this.triaje[i][1];
      contacto = this.triaje[i][2];
      riesgo = this.triaje[i][3];
    }

    return this.xFuzzyService.analizarTriaje(cantidad, gravedad, contacto, riesgo);
  }

}
