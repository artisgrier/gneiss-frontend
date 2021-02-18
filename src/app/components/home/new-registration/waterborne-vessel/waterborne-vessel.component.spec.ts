import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterborneVesselComponent } from './waterborne-vessel.component';

describe('WaterborneVesselComponent', () => {
  let component: WaterborneVesselComponent;
  let fixture: ComponentFixture<WaterborneVesselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterborneVesselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterborneVesselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
