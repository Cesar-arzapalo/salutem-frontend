import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalPage } from './principal.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pruebas',
    pathMatch: 'full'
  }, {
    path: '',
    component: PrincipalPage,
    children: [
      {
        path: 'pruebas',
        loadChildren: () => import('./pruebas/pruebas.module').then(m => m.PruebasPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalPageRoutingModule {}
