import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AntdTableComponent } from './antd-table/antd-table.component';



const routes: Routes = [
  {
    path: 'antd-table',
    component: AntdTableComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CellSelectableDemoRoutingModule { }
