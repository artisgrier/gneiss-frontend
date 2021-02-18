import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathCertificateComponent } from './death-certificate.component';
import { WalletComponent } from '../../wallet/wallet.component';

describe('DeathCertificateComponent', () => {
  let component: WalletComponent;
  let fixture: ComponentFixture<WalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});