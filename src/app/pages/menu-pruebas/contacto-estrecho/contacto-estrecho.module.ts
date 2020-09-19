import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactoEstrechoPageRoutingModule } from './contacto-estrecho-routing.module';

import { ContactoEstrechoPage } from './contacto-estrecho.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactoEstrechoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ContactoEstrechoPage]
})
export class ContactoEstrechoPageModule {}
