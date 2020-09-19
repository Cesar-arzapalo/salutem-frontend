import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPruebasPageRoutingModule } from './menu-pruebas-routing.module';

import { MenuPruebasPage } from './menu-pruebas.page';
import { ComponentsModule } from '../../components/components.module';
import { SintomasPageModule } from './sintomas/sintomas.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPruebasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MenuPruebasPage]
})
export class MenuPruebasPageModule {}
