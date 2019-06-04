import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtheaterComponent } from './listtheater.component';

describe('ListtheaterComponent', () => {
  let component: ListtheaterComponent;
  let fixture: ComponentFixture<ListtheaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListtheaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListtheaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
