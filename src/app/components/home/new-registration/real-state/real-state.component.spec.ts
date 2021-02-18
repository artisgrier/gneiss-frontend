import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealStateComponent } from './real-state.component';

describe('RealStateComponent', () => {
  let component: RealStateComponent;
  let fixture: ComponentFixture<RealStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
