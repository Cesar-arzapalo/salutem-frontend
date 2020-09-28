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


  getPregunta = (id: string): any => {
       return this.http.get(`${URL}/pregunta`)
         .pipe(map( this.generarPregunta));
  }

  getPreguntas(){

  }

  setPregunta(id: string){

  }

  crearPregunta(pregunta: PreguntaModel){

  }

  eliminarPregunta(id: string){

  }

  private generarPregunta = (preguntaObject: any) => {
    const pregunta: PreguntaModel = preguntaObject;
    pregunta.id = preguntaObject._id;

    console.log(preguntaObject);
    return preguntaObject;
  }


}
