# ngx-cell-selectable

An Angular directive makes table cells selectable and copyable.

## Install

You can get it on npm.

```bat
npm install ngx-cell-selectable
```

Open your module file e.g `app.module.ts` and update **imports** array

```ts
import { NgxCellSelectableModule } from 'ngx-cell-selectable';
...
imports: [
...
    NgxCellSelectableModule,
...
]
```

## Usage


To make the cells selectable, you must disable the default selection function, define class e.g:
```
.disable-select {
    -moz-user-select: -moz-none;
    -moz-user-select: none;
    -o-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

```
And define the class to be rendered when you select the cells; e.g:
```
.eng-selected-cell {
    background-color: #438eb9  !important;
    color: #fff !important;
    > * {
        color: #fff !important;
    }
}
```
Next, in your component `.ts`, add the four most important properties as the input properties of the directive, e.g:
```
  cellSelectionInfo = new CellSelectionInfo();

  columns = [
    { binding: 'index', title: 'name' },
    { binding: 'name', title: 'name' },
    { binding: 'age', title: 'age' },
    { binding: 'address', title: 'address' },
  ];

  data = [];

  valueProp = 'binding'
```
and in component `.html`,
Set these four properties to the table, e.g:
```
  <table tabindex="-1" hidefocus="true" [ngxCellSelectable]="cellSelectionInfo" [data]="data" [valueProp]="valueProp"
  [columns]="columns">
  ...
  </table>
```
Tip: In order for the table to be focused, it is also necessary to add the attribute `tabindex="-1" hidefocus="true"` to the table tag.

The next step is to use `*ngFor` to loop table columns and table data, set the ID of td according to the row index and column index(It's important!), e.g:`[id]="rowIndex + '-' + colIndex"`, and use `ngClass` in td to set the class to use when the cell is selected, e.g:
```
  <tr>
    <th *ngFor="let c of columns" width="200px">{{ c.title }}</th>
  </tr>
  <tr *ngFor="let item of data; let rowIndex = index" class="disable-select">
    <td *ngFor="let c of columns; let colIndex = index" 
    [id]="rowIndex + '-' + colIndex" 
    [ngClass]="{'eng-selected-cell': cellSelectionInfo.selectionSet.has(rowIndex + '-' + colIndex)}">{{ item[c.binding] }}</td>
  </tr>
```
Finally, through cellSelectionInfo to get the selected relevant information, including how many items are selected, the average, and summary. In cellSelectionInfo.selection, you can get the id and value of the selected item (from data), e.g:
```
<div *ngIf="cellSelectionInfo.agg.cnt > 1; else cntAll">
        cntAll: <span>{{ cellSelectionInfo.agg.cntAll }}</span>;
        avg: <span >{{ cellSelectionInfo.agg.avg | number: '1.0-2' }}</span>;
        sum: <span>{{ cellSelectionInfo.agg.sum | number: '1.0-2' }}</span>;
</div>
<ng-template #cntAll>
    cntAll: <span>{{ cellSelectionInfo.agg.cntAll | number: '1.0-2' }}</span> 
</ng-template>
```
## License
MIT
