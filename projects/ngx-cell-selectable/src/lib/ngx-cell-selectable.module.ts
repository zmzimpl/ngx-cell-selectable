import { NgModule } from '@angular/core';
import { NgxCellSelectableDirective } from './ngx-cell-selectable.directive';
import { ClipboardModule } from 'ngx-clipboard';


@NgModule({
  declarations: [NgxCellSelectableDirective],
  imports: [
    ClipboardModule,
  ],
  exports: [NgxCellSelectableDirective]
})
export class NgxCellSelectableModule { }
