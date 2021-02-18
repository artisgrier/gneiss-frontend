import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoassetsComponent } from './cryptoassets.component';

describe('CryptoassetsComponent', () => {
  let component: CryptoassetsComponent;
  let fixture: ComponentFixture<CryptoassetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoassetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoassetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
