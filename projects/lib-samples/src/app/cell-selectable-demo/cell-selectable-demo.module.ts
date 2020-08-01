import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AntdTableComponent } from './antd-table/antd-table.component';
import { CellSelectableDemoRoutingModule } from './cell-selectable-demo-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { HttpClientModule } from '@angular/common/http';
import { NgxCellSelectableModule } from 'ngx-cell-selectable';
import { BasicTableComponent } from './basic-table/basic-table.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { PrimengTableComponent } from './primeng-table/primeng-table.component';
import {TableModule} from 'primeng/table';

const ZORROModule = [
  NzTableModule,
  NzGridModule,
  TableModule
];


@NgModule({
  declarations: [AntdTableComponent, BasicTableComponent, PrimengTableComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    CellSelectableDemoRoutingModule,
    NgxCellSelectableModule,
    ...ZORROModule
  ]
})
export class CellSelectableDemoModule { }
