import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { CuestionarioComponent } from './cuestionario/cuestionario.component';



@NgModule({
  declarations: [HeaderComponent, ProgressBarComponent, CuestionarioComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [HeaderComponent, ProgressBarComponent, CuestionarioComponent]
})
export class ComponentsModule { }
