	
import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[ngxCellSelectable]'
})
export class NgxCellSelectableDirective {

  cellSelectionInfo: CellSelectionInfo = null;
  @Input()
  public set ngxCellSelectable(item: any) {
    this.cellSelectionInfo = item;
  }

  @Input() data: any[];

  @Input() columns: any[];

  @Input() valueProp = 'binding';

  @Output() cellSelectionInfoChange: EventEmitter<CellSelectionInfo> = new EventEmitter();

  @Output() copy: EventEmitter<string> = new EventEmitter();

  cls = 'eng-selected-cell';

  constructor(
    @Inject(DOCUMENT) private dom: any,
    private tableRef: ElementRef,
  ) {
    setTimeout(() => {
      if (this.cellSelectionInfo) {
        document.body.addEventListener('mouseup', (evt: MouseEvent) => {
          if (evt['which'] === 1) { // 鼠标左键
            this.mouseUp();
          }
        });
        document.addEventListener('copy', (evt: ClipboardEvent) => {  // 当前激活状态的dom是当前表格，并且触发了复制事件
          if (document.activeElement === this.tableRef.nativeElement && this.cellSelectionInfo.selection?.length) {
            const data = this.cellSelectionInfo.selection.map(item => item.value);
            const rowDistance = Math.abs(+this.cellSelectionInfo.endEl.id.split('-')[0] - +this.cellSelectionInfo.start.id.split('-')[0]);
            const cellDistance = Math.abs(+this.cellSelectionInfo.endEl.id.split('-')[1] - +this.cellSelectionInfo.start.id.split('-')[1]);
            let insertIndex;
            let insertCount = 0;
            for (let i = 1; i <= rowDistance; i++) {
              insertIndex = cellDistance * i + i + insertCount;
              data.splice(insertIndex, 0, '\n');
              insertCount++;
            }
            this._copy(' ' + data.join(' '));
          }
      });
      }
    }, 0);
  }

  private _copy(value: string) {
    let copyTextArea = (null as any) as HTMLTextAreaElement; // tslint:disable-line:no-any
      try {
        copyTextArea = this.dom.createElement('textarea');
        copyTextArea.style.height = '0px';
        copyTextArea.style.opacity = '0';
        copyTextArea.style.width = '0px';
        copyTextArea.style.position = 'absolute';
        copyTextArea.style.zIndex = '-1';
        this.dom.body.appendChild(copyTextArea);
        copyTextArea.value = value;
        copyTextArea.select();
        this.dom.execCommand('copy');
        this.copy.emit(value);
      } catch {
        console.error('failed to copy');
      } finally {
        if (copyTextArea && copyTextArea.parentNode) {
          copyTextArea.parentNode.removeChild(copyTextArea);
        }
      }
  }
  /**
   * 鼠标的松开事件
   */
  mouseUp() {
    this.cellSelectionInfo.dragging = false;
    this.cellSelectionInfo.initialStartId = undefined;
    this.cellSelectionInfoChange.emit(this.cellSelectionInfo);
  }

  setStartCell(el: HTMLTableCellElement) {
    if (this.cellSelectionInfo) {
      this.cellSelectionInfo.selection = [];
      this.cellSelectionInfo.selectionSet.clear();
      this.cellSelectionInfo.initialStartId = el.id;
      this.cellSelectionInfo.startEl = el;
      this.cellSelectionInfo.start.id = el.id;
    }
  }

  /** 设置终点 */
  setEndCell(el) {
    this.cellSelectionInfo.endEl = el;
    this.cellsBetween(el);
    const agg = { cnt: 0, cntAll: 0, sum: 0, avg: 0 };
    this.cellSelectionInfo.selection.forEach(rng => {
        this.aggregateRange(agg, rng);
    });
    if (agg.cnt > 0) {
      agg.avg = agg.sum / agg.cnt;
    }
    this.cellSelectionInfo.agg = agg;
  }

  /**
   * 统计
   * @param agg 统计信息对象
   * @param rng 选中的单元格信息
   */
  aggregateRange(agg: any, rng: any) {
    const cellData = rng.value ?? '';
    if (cellData !== '' && !isNaN(+cellData) && typeof +cellData === 'number') { // 数字
      agg.sum += +cellData;
      agg.cnt++ ;
    }
    if (cellData !== null) {
      agg.cntAll++;
    }
  }

  /** 根据区间渲染选中区域 */
  rectangleSelect(minCellInex: number, maxCellInex: number, minRowIndex: number, maxRowIndex: number) {
    this.cellSelectionInfo.selectionSet.clear();
    this.cellSelectionInfo.selection = [];
    for (let i = minRowIndex; i <= maxRowIndex; i++) {
      for (let j = minCellInex; j <= maxCellInex; j++ ) {
        if (!this.cellSelectionInfo.selectionSet.has(i + '-' + j)) {
          let value = '';
          value = this.data[i][this.columns[j][this.valueProp]];
          this.cellSelectionInfo.selection.push({
            id: i + '-' + j,
            value,
            row: this.data[i],
            rowIndex: i,
            column: this.columns[j]
          });
          this.cellSelectionInfo.selectionSet.add(i + '-' + j);
        }
      }
    }
  }

  cellsBetween(end) {
    // 计算区间
    const bounds = { minCellIndex: 0, minRowIndex: 0, maxCellInex: 0, maxRowIndex: 0 };
    const startRowIndex = +this.cellSelectionInfo.initialStartId.split('-')[0];
    const startCellIndex = +this.cellSelectionInfo.initialStartId.split('-')[1];
    const endRowIndex = +end.id.split('-')[0];
    const endCellIndex = +end.id.split('-')[1];
    bounds.minCellIndex = startCellIndex < endCellIndex ? startCellIndex : endCellIndex;
    bounds.maxCellInex = startCellIndex > endCellIndex ? startCellIndex : endCellIndex;
    bounds.minRowIndex = startRowIndex < endRowIndex ? startRowIndex : endRowIndex;
    bounds.maxRowIndex = startRowIndex > endRowIndex ? startRowIndex : endRowIndex;

    this.rectangleSelect(bounds.minCellIndex, bounds.maxCellInex, bounds.minRowIndex, bounds.maxRowIndex);
  }

  /** 鼠标在表格容器上移动事件 */
  overControl(evt: MouseEvent) {
    if (evt.target['tagName'] === 'TD') {
      if (!this.cellSelectionInfo.dragging) {
        return;
      }   // 没有框选时不处理
      if (evt.target !== this.cellSelectionInfo.endEl) {
        // 设置终点
        this.setEndCell(evt.target);
      }
    }
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(evt: MouseEvent) {
    if (this.cellSelectionInfo) {
      if (evt['which'] === 1 && evt.target['tagName'] === 'TD' && evt.target['className'].indexOf('input-cell') < 0) { // 鼠标左键
        if (!this.cellSelectionInfo.dragging) {
          this.setStartCell(evt.target as HTMLTableCellElement);
          this.cellSelectionInfo.dragging = true;
        }
        this.setEndCell(evt.target);
      }
    }
  }

  @HostListener('mouseover', ['$event'])
  onMouseover(evt: MouseEvent) {
    if (this.cellSelectionInfo?.dragging && evt.target['tagName'] === 'TD' && evt.target['className']?.indexOf('input-cell') < 0) {
      this.overControl(evt);
    }
  }

}


export class CellSelectionInfo {
  initialStartId = '';
  dragging = false;
  selection: { id: string, value: string, row: any, rowIndex: number, column: any }[] = [];
  selectionSet: Set<any> = new Set<any>();
  startEl: HTMLTableDataCellElement = null;
  start: { id: string } = {
    id: ''
  };
  endEl: HTMLTableDataCellElement = null;
  agg = { cnt: 0, cntAll: 0, sum: 0, avg: 0 };
}