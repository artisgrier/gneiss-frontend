import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewCoinComponent } from '../new-coin/new-coin.component';



describe('NewCoinComponent', () => {
  let component: NewCoinComponent;
  let fixture: ComponentFixture<NewCoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
