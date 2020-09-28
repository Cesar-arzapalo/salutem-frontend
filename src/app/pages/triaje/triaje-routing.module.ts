import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TriajePage } from './triaje.page';

const routes: Routes = [
  {
    path: '',
    component: TriajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TriajePageRoutingModule {}
