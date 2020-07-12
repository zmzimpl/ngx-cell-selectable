import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CellSelectionInfo } from 'ngx-cell-selectable';

@Component({
  selector: 'app-antd-table',
  templateUrl: './antd-table.component.html',
  styleUrls: ['./antd-table.component.less']
})
export class AntdTableComponent implements OnInit, AfterViewInit, OnDestroy {

    /** 单元格选中信息 */
    cellSelectionInfo = new CellSelectionInfo();

    columns = [
      { binding: 'index', title: 'name' },
      { binding: 'name', title: 'name' },
      { binding: 'age', title: 'age' },
      { binding: 'address', title: 'address' },
    ]

  @ViewChild('virtualTable', { static: false }) nzTableComponent?: NzTableComponent;
  private destroy$ = new Subject();
  listOfData: VirtualDataInterface[] = [];

  scrollToIndex(index: number): void {
    this.nzTableComponent?.cdkVirtualScrollViewport?.scrollToIndex(index);
  }

  trackByIndex(_: number, data: VirtualDataInterface): number {
    return data.index;
  }

  ngOnInit(): void {
    const data = [];
    for (let i = 0; i < 20000; i++) {
      data.push({
        index: i,
        name: `Edward`,
        age: i,
        address: `London`
      });
    }
    this.listOfData = data;
  }

  ngAfterViewInit(): void {
    this.nzTableComponent?.cdkVirtualScrollViewport?.scrolledIndexChange.pipe(takeUntil(this.destroy$)).subscribe((data: number) => {
      console.log('scroll index to', data);
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