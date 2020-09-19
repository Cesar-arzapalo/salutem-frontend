import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NivelRiesgoPage } from './nivel-riesgo.page';

const routes: Routes = [
  {
    path: '',
    component: NivelRiesgoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NivelRiesgoPageRoutingModule {}
