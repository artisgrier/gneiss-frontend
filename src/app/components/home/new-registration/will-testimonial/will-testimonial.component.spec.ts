import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WillTestimonialComponent } from './will-testimonial.component';

describe('WillTestimonialComponent', () => {
  let component: WillTestimonialComponent;
  let fixture: ComponentFixture<WillTestimonialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WillTestimonialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WillTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
