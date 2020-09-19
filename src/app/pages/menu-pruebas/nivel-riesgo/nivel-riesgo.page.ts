import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nivel-riesgo',
  templateUrl: './nivel-riesgo.page.html',
  styleUrls: ['./nivel-riesgo.page.scss'],
})
export class NivelRiesgoPage implements OnInit {
  pathParent: string;
  constructor(private route: Router) {
    this.pathParent = route.routerState.snapshot.root.children[0].routeConfig.path;
  }

  ngOnInit() {
  }

}
