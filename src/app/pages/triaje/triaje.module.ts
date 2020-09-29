import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TriajePageRoutingModule } from './triaje-routing.module';

import { TriajePage } from './triaje.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TriajePageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule, FormsModule
  ],
  declarations: [TriajePage]
})
export class TriajePageModule {}
