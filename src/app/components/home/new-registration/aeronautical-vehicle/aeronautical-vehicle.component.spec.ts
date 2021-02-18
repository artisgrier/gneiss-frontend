import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AeronauticalVehicleComponent } from './aeronautical-vehicle.component';

describe('AeronauticalVehicleComponent', () => {
  let component: AeronauticalVehicleComponent;
  let fixture: ComponentFixture<AeronauticalVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AeronauticalVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AeronauticalVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
