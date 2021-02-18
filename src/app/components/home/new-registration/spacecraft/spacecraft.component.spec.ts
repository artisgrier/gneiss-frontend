import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacecraftComponent } from './spacecraft.component';

describe('SpacecraftComponent', () => {
  let component: SpacecraftComponent;
  let fixture: ComponentFixture<SpacecraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpacecraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacecraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
