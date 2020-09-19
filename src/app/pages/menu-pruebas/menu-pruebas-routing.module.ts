import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPruebasPage } from './menu-pruebas.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPruebasPage
  },
  {
    path: 'sintomas',
    loadChildren: () => import('./sintomas/sintomas.module').then( m => m.SintomasPageModule)
  },
  {
    path: 'contacto-estrecho',
    loadChildren: () => import('./contacto-estrecho/contacto-estrecho.module').then( m => m.ContactoEstrechoPageModule)
  },
  {
    path: 'nivel-riesgo',
    loadChildren: () => import('./nivel-riesgo/nivel-riesgo.module').then( m => m.NivelRiesgoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPruebasPageRoutingModule {}
