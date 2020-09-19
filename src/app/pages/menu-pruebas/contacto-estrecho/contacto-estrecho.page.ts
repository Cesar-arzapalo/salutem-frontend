import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacto-estrecho',
  templateUrl: './contacto-estrecho.page.html',
  styleUrls: ['./contacto-estrecho.page.scss'],
})
export class ContactoEstrechoPage implements OnInit {
  pathParent: string;
  constructor(private route: Router) {
    this.pathParent = route.routerState.snapshot.root.children[0].routeConfig.path;
  }

  ngOnInit() {
  }

}
