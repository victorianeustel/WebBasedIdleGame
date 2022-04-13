import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickButtonComponent } from './click-button.component';

describe('ClickButtonComponent', () => {
  let component: ClickButtonComponent;
  let fixture: ComponentFixture<ClickButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClickButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
