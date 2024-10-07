import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UIDatePickerComponent } from './ui-date-picker.component';

describe('UIDatePickerComponent', () => {
  let component: UIDatePickerComponent;
  let fixture: ComponentFixture<UIDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UIDatePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UIDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
