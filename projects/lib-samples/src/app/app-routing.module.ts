import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path: 'cell-selectable',
    loadChildren: () => import('./cell-selectable-demo/cell-selectable-demo.module').then(m => m.CellSelectableDemoModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
