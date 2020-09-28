import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.scss'],
})
export class CuestionarioComponent implements OnInit {

  @Input() cuestionario;

  constructor() {
    console.log(this.cuestionario);
  }

  ngOnInit() {
    console.log(this.cuestionario);
  }

}
