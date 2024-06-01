import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TOnlineComponent } from './t-online.component';

describe('TOnlineComponent', () => {
  let component: TOnlineComponent;
  let fixture: ComponentFixture<TOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TOnlineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
