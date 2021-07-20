import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SIdentifierPageRoutingModule } from './s-identifier-routing.module';

import { SIdentifierPage } from './s-identifier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SIdentifierPageRoutingModule
  ],
  declarations: [SIdentifierPage]
})
export class SIdentifierPageModule {}
