import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntdTableComponent } from './antd-table.component';

describe('AntdTableComponent', () => {
  let component: AntdTableComponent;
  let fixture: ComponentFixture<AntdTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntdTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntdTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
