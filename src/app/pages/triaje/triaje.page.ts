import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-triaje',
  templateUrl: './triaje.page.html',
  styleUrls: ['./triaje.page.scss'],
})
export class TriajePage implements OnInit {

  nivelCuestionario: number;

  constructor() {
    this.nivelCuestionario = 1;
  }

  ngOnInit() {
  }

}
