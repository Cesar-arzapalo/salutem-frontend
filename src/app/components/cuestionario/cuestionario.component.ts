import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CuestionarioModel } from '../../models/cuestionario.model';
import { Router } from '@angular/router';
import { XFuzzyService } from '../../services/xfuzzy.service';
import { AnalisisCuestionarioModel } from '../../models/AnalizasCuestionario.model';
import { PreguntaModel } from '../../models/pregunta.model';

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
  @Output() analizarCuestionario: EventEmitter<AnalisisCuestionarioModel>;
  cuestionarioFomr: FormGroup;

  nombreControles: string[][];
  nombreGrupos: string[];

  loading: boolean;

  cuestionarioValido: boolean;

  colFinalizar: number;
  colSiguiente: number;
  colVolver: number;

  preguntasValidas:boolean[];
  valorCuestionario:any;

  triaje: number[];  // pos 0: cantidad, pos 1: gravedad, pos 2: contacto, pos 3: riesgo

  constructor(private router: Router, private xFuzzyService: XFuzzyService) {
    this.nombreControles = [];
    this.nombreGrupos = [];
    this.loading = true;
    this.paginaActual = 1;
    this.numeroCambiado = new EventEmitter();
    this.analizarCuestionario = new EventEmitter();
    this.cuestionarioFomr = new FormGroup({});
    this.triaje = [0, 0, 0, 0];
    this.cuestionarioValido = false;
    this.preguntasValidas=[];
    this.valorCuestionario = new Object();
  }

  definirColumnasXPagina = () => {
    if (this.cuestionario.nroPaginaAsignada === 1){
      this.colSiguiente = 12;
      this.colFinalizar = 0;
      this.colVolver = 0;
    }else if (this.cuestionario.nroPaginaAsignada === 5){
      this.colSiguiente = 0;
      this.colFinalizar = 6;
      this.colVolver = 6;
    }else{
      this.colSiguiente = 6;
      this.colFinalizar = 0;
      this.colVolver = 6;
    }
  }

  ngOnInit() {
    this.definirColumnasXPagina();

    this.crearFormulario();
    this.revizarValidesCuestionario(this.cuestionarioFomr.value);
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
        nombres.push(`pregunta ${i}`);
        this.cuestionarioFomr.addControl(`pregunta ${i}`, new FormControl([Validators.requiredTrue]));

      }else{
        fromPregunta = new FormGroup({});
        this.nombreGrupos.push(`pregunta ${i}`);
        for (let j = 1; j <= cantidadAlternativas; j += 1){
          const nombre = `pregunta ${i} - alternativa ${j}`;
          fromPregunta.addControl(nombre, new FormControl());
          nombres.push(nombre);
        }

        this.cuestionarioFomr.addControl(`pregunta ${i}`, fromPregunta);
      }
      this.nombreControles.push(nombres);
    }
  }

  revizarValidesCuestionario(valor: any){
    console.log(this.cuestionarioFomr);
      this.valorCuestionario=valor;
      this.validarCuestionario();
      console.log(`valor del cuestionario: ${this.cuestionarioValido}`)
  }

  crearListener(){
    this.cuestionarioFomr.valueChanges.subscribe((valor) => {
      console.log(valor);
      this.revizarValidesCuestionario(valor);
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

    this.analizar();

    this.paginaActual += 1;

    this.numeroCambiado.emit(this.paginaActual);
  }

  rergesarCuestionario(){

    this.paginaActual -= 1;

    this.numeroCambiado.emit(this.paginaActual);
  }

  finalizarCuestionario(){
    this.analizar();
  }

  analizar(): boolean {
    if (this.cuestionarioFomr.invalid){
      this.controlaMarkTouch(this.cuestionarioFomr);
      return false;
    }
    console.log(this.cuestionario);

    console.log(this.triaje);

    this.realizarCalculoCuestionario();
    this.validarCuestionario;

    console.log(this.triaje);

    this.analizarCuestionario.emit( new AnalisisCuestionarioModel(this.triaje, this.paginaActual));

  }

  private realizarCalculoCuestionario(){
    const valoresCuestionario: object = this.cuestionarioFomr.value;
    console.log(valoresCuestionario);
    let index = 0;
    this.triaje = [0, 0, 0, 0];

    for (const pregunta of this.cuestionario.preguntas){
      const tipoVariable: string = pregunta.tipoVariable;
      const puntaje: number =
        (pregunta.peso !== undefined) ? pregunta.peso : pregunta.pesoAlternativas[valoresCuestionario[`pregunta ${index + 1}`]];

      if (pregunta.tipoAlternativa === 2){
        this.procesarAlternativa(tipoVariable, puntaje);
      } else {

        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < pregunta.alternativas.length ; i += 1){
          const valor = valoresCuestionario[`pregunta ${index + 1}`][`pregunta ${index + 1} - alternativa ${i + 1}`];

          if ( valor !== null && valor !== false ){
            this.procesarAlternativa(tipoVariable, puntaje);
          }
          }
        }
      index += 1;
    }

    }
    private procesarAlternativa = (tipoVariable: string, puntaje: number) => {
      switch (tipoVariable){
        case 'sintoma': {
          this.triaje[0] += 1;
          this.triaje[1] += puntaje ;
          break;
        }
        case 'contacto': {
          this.triaje[2] += puntaje;
          break;
        }
        case 'riesgo': {
          this.triaje[3] += puntaje;
          break;
        }
      }

    }

    
    public validarCuestionario = () => {
      this.realizarCalculoCuestionario();
      this.preguntasValidadas();
      this.cuestionarioValido = !this.componenteNaN() && this.preguntasValidadas();
    }

    private componenteNaN = ():boolean  => {
      var nan: boolean = false;
      this.triaje.forEach(element => {
        if ( nan!== true && element.toString()==="NaN") {nan = true; console.log(element,1);}
      });
      return nan;
    }

    private preguntasValidadas = (): boolean => {
      var preguntaValida: boolean = true;

      this.registrarValidesPreguntas();

      this.preguntasValidas.forEach(element => {
        if ( preguntaValida!== false ) {preguntaValida = element;}
      });
      return preguntaValida;
    }

    private registrarValidesPreguntas = ():void =>{

      var index = 0;
      this.preguntasValidas = [];
      for (const preguntaM of this.cuestionario.preguntas){
        var valorValido: boolean = false;
        if(preguntaM.tipoAlternativa===2){
          var isNumber = Number(this.valorCuestionario[`pregunta ${ index+ 1}`].toString());
          valorValido = isNumber.toString()!=='NaN';
          console.log(`==> ${valorValido} - ${index+1}`);
        }
        else{
          // for (let i = 0; i < preguntaM.alternativas.length ; i += 1){
          //   const valor = this.valorCuestionario[`pregunta ${ index+ 1}`][`pregunta ${index + 1} - alternativa ${i + 1}`];
  
          //   if ( valor !== null && valor !== false ){
          //     console.log(valor,index+1,i+1);
          //     valorValido = valor;
          //   }
            
          // }
          valorValido = true;
          console.log(`==> ${valorValido} - ${index+1}`);
        }
        this.preguntasValidas.push(valorValido);
        index+=1;
      }
      console.log(this.valorCuestionario);
    }

  }



