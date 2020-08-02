import { Component, OnInit } from '@angular/core';
import { CellSelectionInfo } from 'ngx-cell-selectable';
import { TableDataService } from '../table-data.service';

@Component({
  selector: 'app-basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.less']
})
export class BasicTableComponent implements OnInit {

  /** 单元格选中信息 */
  cellSelectionInfo = new CellSelectionInfo();

  columns = [];

  data = [];

  constructor(private tableDataService: TableDataService) { }

  ngOnInit(): void {
    this.columns = this.tableDataService.getTableColumns();
    this.data = this.tableDataService.getTableData();
  }

  cellSelectionInfoChange(evt: CellSelectionInfo) {
    console.log(evt);
  }

  clearSelection() {
    this.cellSelectionInfo.selection = [];
    this.cellSelectionInfo.selectionSet.clear();
  }

  copy(evt: any) {
    console.log(evt);
  }

}
