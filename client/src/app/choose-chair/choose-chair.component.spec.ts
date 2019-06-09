import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseChairComponent } from './choose-chair.component';

describe('ChooseChairComponent', () => {
  let component: ChooseChairComponent;
  let fixture: ComponentFixture<ChooseChairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseChairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseChairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
