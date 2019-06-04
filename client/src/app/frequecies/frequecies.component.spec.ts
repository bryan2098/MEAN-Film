import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequeciesComponent } from './frequecies.component';

describe('FrequeciesComponent', () => {
  let component: FrequeciesComponent;
  let fixture: ComponentFixture<FrequeciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrequeciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequeciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
