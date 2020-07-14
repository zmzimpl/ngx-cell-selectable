import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CellSelectionInfo } from 'ngx-cell-selectable';
import { TableDataService } from '../table-data.service';

@Component({
  selector: 'app-primeng-table',
  templateUrl: './primeng-table.component.html',
  styleUrls: ['./primeng-table.component.less']
})
export class PrimengTableComponent implements OnInit {

  /** 单元格选中信息 */
  cellSelectionInfo = new CellSelectionInfo();

  columns = [];

  data = [];

  constructor(private tableDataService: TableDataService) { }

  ngOnInit(): void {
    this.columns = this.tableDataService.getTableColumns();
    this.data = this.tableDataService.getTableData();
  }

}
