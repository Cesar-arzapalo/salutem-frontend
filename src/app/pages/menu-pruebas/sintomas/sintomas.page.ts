import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pregunta } from '../../../models/pregunta.model';

@Component({
  selector: 'app-sintomas',
  templateUrl: './sintomas.page.html',
  styleUrls: ['./sintomas.page.scss'],
})
export class SintomasPage implements OnInit {
  pathParent: string;
  cantPregtEval: number;
  preguntas: Pregunta[];

  constructor(private route: Router) {
    this.pathParent = route.routerState.snapshot.root.children[0].routeConfig.path;
    this.cantPregtEval = 0;
    this.preguntas = [];
  }

  ngOnInit() {
  }

}
