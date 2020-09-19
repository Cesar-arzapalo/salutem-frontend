import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NivelRiesgoPageRoutingModule } from './nivel-riesgo-routing.module';

import { NivelRiesgoPage } from './nivel-riesgo.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NivelRiesgoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [NivelRiesgoPage]
})
export class NivelRiesgoPageModule {}
