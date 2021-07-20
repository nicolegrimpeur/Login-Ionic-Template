import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SIdentifierPage } from './s-identifier.page';

const routes: Routes = [
  {
    path: '',
    component: SIdentifierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SIdentifierPageRoutingModule {}
