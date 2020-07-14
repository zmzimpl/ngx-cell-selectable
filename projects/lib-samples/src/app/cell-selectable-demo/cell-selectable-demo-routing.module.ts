import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AntdTableComponent } from './antd-table/antd-table.component';
import { BasicTableComponent } from './basic-table/basic-table.component';
import { PrimengTableComponent } from './primeng-table/primeng-table.component';



const routes: Routes = [
  {
    path: 'basic-table',
    component: BasicTableComponent
  },
  {
    path: 'antd-table',
    component: AntdTableComponent
  },
  {
    path: 'primeng-table',
    component: PrimengTableComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CellSelectableDemoRoutingModule { }
