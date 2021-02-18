import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageRegistrationComponent } from './marriage-registration.component';

describe('MarriageRegistrationComponent', () => {
  let component: MarriageRegistrationComponent;
  let fixture: ComponentFixture<MarriageRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
