/*
 * Public API Surface of ngx-cell-selectable
 */

export * from './lib/ngx-cell-selectable.module';




export class CellSelectionInfo {
    initialStartId = '';
    dragging = false;
    selection: {id: string, value: string}[] = [];
    selectionSet: Set<any> = new Set<any>();
    startEl: HTMLTableDataCellElement = null;
    start: { id: string } = {
      id: ''
    };
    endEl: HTMLTableDataCellElement = null;
    agg = { cnt: 0, cntAll: 0, sum: 0, avg: 0 };
}