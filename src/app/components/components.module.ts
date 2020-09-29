import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { CuestionarioComponent } from './cuestionario/cuestionario.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [HeaderComponent, ProgressBarComponent, CuestionarioComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [HeaderComponent, ProgressBarComponent, CuestionarioComponent]
})
export class ComponentsModule { }
