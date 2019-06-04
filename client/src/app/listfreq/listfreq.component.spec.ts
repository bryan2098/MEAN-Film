import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListfreqComponent } from './listfreq.component';

describe('ListfreqComponent', () => {
  let component: ListfreqComponent;
  let fixture: ComponentFixture<ListfreqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListfreqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListfreqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
