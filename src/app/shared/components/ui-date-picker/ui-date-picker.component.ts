import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-ui-date-picker',
  templateUrl: './ui-date-picker.component.html',
  styleUrl: './ui-date-picker.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UIDatePickerComponent),
      multi: true
    }
  ]
})
export class UIDatePickerComponent implements ControlValueAccessor {
  month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  week_days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  currDate = new Date();
  curr_month = { value: this.currDate.getMonth() };
  curr_year = { value: this.currDate.getFullYear() };
  selectedDate: Date | null = null;
  calendar_days: (number | null)[] = [];
  isDarkMode = false;

  private onChange: (date: Date) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    this.generateCalendar(this.curr_month.value, this.curr_year.value);
  }

  generateCalendar(month: number, year: number) {
    const days_of_month = [31, this.getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const first_day = new Date(year, month, 1).getDay();

    this.calendar_days = [];
    for (let i = 0; i < first_day; i++) {
      this.calendar_days.push(null);  // Espacios vacíos antes del 1
    }

    for (let i = 1; i <= days_of_month[month]; i++) {
      this.calendar_days.push(i);  // Los días del mes
    }
  }

  getFebDays(year: number): number {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
  }

  isCurrentDay(day: number): boolean {
    const today = new Date();
    return today.getDate() === day &&
           today.getMonth() === this.curr_month.value &&
           today.getFullYear() === this.curr_year.value;
  }

  selectDate(day: number) {
    if (day) {
      this.selectedDate = new Date(this.curr_year.value, this.curr_month.value, day);
      this.onChange(this.selectedDate);
    }
  }

  prevYear() {
    this.curr_year.value--;
    this.generateCalendar(this.curr_month.value, this.curr_year.value);
  }

  nextYear() {
    this.curr_year.value++;
    this.generateCalendar(this.curr_month.value, this.curr_year.value);
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark', this.isDarkMode);
    document.body.classList.toggle('light', !this.isDarkMode);
  }

  // ControlValueAccessor methods
  writeValue(date: Date): void {
    if (date) {
      this.curr_year.value = date.getFullYear();
      this.curr_month.value = date.getMonth();
      this.generateCalendar(this.curr_month.value, this.curr_year.value);
    }
  }

  registerOnChange(fn: (date: Date) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Implement disabled state handling if needed
  }
}
