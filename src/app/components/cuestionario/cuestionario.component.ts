import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CuestionarioModel } from '../../models/cuestionario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.scss'],
})
export class CuestionarioComponent implements OnInit {

  @Input() cuestionario: CuestionarioModel;
  @Input() cantidadCuestionarios: number;
  @Input() paginaActual: number;
  @Output() numeroCambiado: EventEmitter<number>;
  cuestionarioFomr: FormGroup;

  nombreControles: string[][];
  nombreGrupos: string[];

  loading: boolean;

  colFinalizar: number;
  colSiguiente: number;
  colVolver: number;

  constructor(private router: Router) {
    this.nombreControles = [];
    this.nombreGrupos = [];
    this.loading = true;
    this.colSiguiente = 12;
    this.colFinalizar = 0;
    this.colVolver = 0;
    this.paginaActual = 1;
    this.numeroCambiado = new EventEmitter();
    this.cuestionarioFomr = new FormGroup({});
  }

  ngOnInit() {
    this.crearFormulario();
    this.crearListener();

    this.loading = false;
  }

  valorNoValido(value: string){
    return this.cuestionarioFomr.get(value).touched && this.cuestionarioFomr.get(value).invalid;
  }

  crearFormulario(){
    const cantPreguntas: number = this.cuestionario.preguntas.length ;

    for (let i = 1; i <= cantPreguntas; i += 1){
      const pregunta = this.cuestionario.preguntas[i - 1];
      const cantidadAlternativas: number = pregunta.alternativas.length;
      let fromPregunta: FormGroup;
      const nombres: string[] = [];

      if (pregunta.tipoAlternativa === 2){
        this.nombreGrupos.push(`no-posee`);
        nombres.push(`pregunta ${i} - radio`);
        this.cuestionarioFomr.addControl(`pregunta ${i} - radio`, new FormControl([Validators.requiredTrue]));

      }else{
        fromPregunta = new FormGroup({});
        this.nombreGrupos.push(`pregunta ${i} - check`);
        for (let j = 1; j <= cantidadAlternativas; j += 1){
          const nombre = `pregunta ${i} - alternativa ${j} - check`;
          fromPregunta.addControl(nombre, new FormControl());
          nombres.push(nombre);
        }

        this.cuestionarioFomr.addControl(`pregunta ${i} - check`, fromPregunta);
      }
      this.nombreControles.push(nombres);
    }

    console.log(this.paginaActual);
  }

  crearListener(){
    console.log(this.cuestionarioFomr);
    this.cuestionarioFomr.valueChanges.subscribe((valor) => {
      console.log(this.cuestionarioFomr);
      console.log(valor);
    });
    this.cuestionarioFomr.statusChanges.subscribe((status) => {
      console.log({status});
    });
    // this.cuestionarioFomr.get('nombre').valueChanges.subscribe(console.log);
  }

  controlaMarkTouch(fc: any){
    Object.values(fc).forEach( control => {
      if (control instanceof FormControl){
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.controlaMarkTouch(control.controls);
      }
    });
  }

  pasarCuestionario(){
    console.log(this.paginaActual);
    console.log(this.colSiguiente,this.colVolver );
    if (this.paginaActual === 1){
      
      this.colSiguiente = 6;
      this.colVolver = 6;
    }else if (this.paginaActual === 4) {
      this.colSiguiente = 0;
      this.colFinalizar = 6;
      this.colVolver = 6;
    }
    console.log(this.colSiguiente, this.colVolver );

    this.paginaActual += 1;
    this.analizar();
    this.numeroCambiado.emit(this.paginaActual);
  }

  rergesarCuestionario(){
    console.log(this.paginaActual);
    if (this.paginaActual === 2){
      this.colSiguiente = 12;
      this.colVolver = 0;
    }else if (this.paginaActual === 5) {
      this.colSiguiente = 0;
      this.colVolver = 6;
      this.colFinalizar = 6;
    }
    this.paginaActual -= 1;
    this.numeroCambiado.emit(this.paginaActual);
  }

  finalizarCuestionario(){
    this.analizar();
  }

  analizar(){
    // if (cuestionarioFomr.invalid){
    //   //this.controlaMarkTouch(cuestionarioFomr);
    //   return;
    // }
    console.log(this.cuestionario);

    if (this.paginaActual === this.cantidadCuestionarios){
      this.router.navigateByUrl('/principal/pruebas');
    }
  }

}
