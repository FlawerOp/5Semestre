import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreditosPage } from './creditos.page';

import 'gl-ionic-background-video';



const routes: Routes = [
  {
    path: '',
    component: CreditosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreditosPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreditosPageModule {}
