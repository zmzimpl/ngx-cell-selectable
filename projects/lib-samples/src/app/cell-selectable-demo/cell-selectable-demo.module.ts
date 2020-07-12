import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AntdTableComponent } from './antd-table/antd-table.component';
import { CellSelectableDemoRoutingModule } from './cell-selectable-demo-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { HttpClientModule } from '@angular/common/http';
import { NgxCellSelectableModule } from 'ngx-cell-selectable';
import { BasicTableComponent } from './basic-table/basic-table.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
const ZORROModule = [
  NzTableModule,
  NzGridModule
];


@NgModule({
  declarations: [AntdTableComponent, BasicTableComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    CellSelectableDemoRoutingModule,
    NgxCellSelectableModule,
    ...ZORROModule
  ]
})
export class CellSelectableDemoModule { }
