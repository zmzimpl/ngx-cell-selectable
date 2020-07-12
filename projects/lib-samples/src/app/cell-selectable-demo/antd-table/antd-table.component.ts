import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TableDataService } from '../table-data.service';
import { CellSelectionInfo } from 'ngx-cell-selectable';

@Component({
  selector: 'app-antd-table',
  templateUrl: './antd-table.component.html',
  styleUrls: ['./antd-table.component.less'],
})
export class AntdTableComponent implements OnInit, AfterViewInit, OnDestroy {
  /** 单元格选中信息 */
  cellSelectionInfo = new CellSelectionInfo();

  columns = [];

  @ViewChild('virtualTable', { static: false })
  nzTableComponent?: NzTableComponent;
  private destroy$ = new Subject();
  listOfData: VirtualDataInterface[] = [];


  constructor(private tableDataService: TableDataService) {

  }

  scrollToIndex(index: number): void {
    this.nzTableComponent?.cdkVirtualScrollViewport?.scrollToIndex(index);
  }

  trackByIndex(_: number, data: VirtualDataInterface): number {
    return data.index;
  }

  ngOnInit(): void {
    this.columns = this.tableDataService.getTableColumns();
    this.listOfData = this.tableDataService.getTableData();
  }

  ngAfterViewInit(): void {
    this.nzTableComponent?.cdkVirtualScrollViewport?.scrolledIndexChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: number) => {
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

export interface VirtualDataInterface {
  index: number;
  name: string;
  age: number;
  address: string;
}
