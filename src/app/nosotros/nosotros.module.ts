import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NosotrosPage } from './nosotros.page';
import 'gl-ionic-background-video';

const routes: Routes = [
  {
    path: '',
    component: NosotrosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NosotrosPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NosotrosPageModule {}
