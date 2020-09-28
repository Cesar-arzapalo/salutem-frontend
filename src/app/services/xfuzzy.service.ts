import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PreguntaModel } from '../models/pregunta.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  constructor(private http: HttpClient) { }


  getPregunta = (id: string): any =>
                  this.http.get(`${URL}/preguntas?id=${id}`)
                    .pipe(map( (resp: any) => this.generarPregunta(resp.mensaje)))


  getPreguntas = () => this.http.get(`${URL}/preguntas`)
                        .pipe(map( this.generarArregloPregunta))

  setPregunta(id: string){

  }

  crearPregunta(pregunta: PreguntaModel){

  }

  eliminarPregunta(id: string){

  }

  private generarArregloPregunta = (object: any)  =>   {
    const preguntas: PreguntaModel[] = [];
    const preguntasObject = object.mensaje;

    if (preguntasObject !== null) {
        Object.keys(preguntasObject).forEach( key =>
          preguntas.push( this.generarPregunta(preguntasObject[key])));
    }
    console.log(preguntas);

    return preguntas;
  }

  private generarPregunta = (preguntaObject: any): PreguntaModel =>
          new PreguntaModel(preguntaObject.descripcion, preguntaObject.alternativas,
                            preguntaObject.tipoAlternativa, preguntaObject.tipoVariable,
                            preguntaObject.nroPagina, preguntaObject._id)



}
