import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimengTableComponent } from './primeng-table.component';

describe('PrimengTableComponent', () => {
  let component: PrimengTableComponent;
  let fixture: ComponentFixture<PrimengTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimengTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimengTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
