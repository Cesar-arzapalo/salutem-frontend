import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPruebasPage } from './menu-pruebas.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPruebasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPruebasPageRoutingModule {}
