import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounce, debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit {

  //public tubo de agua
  private debouncer: Subject<string> = new Subject<string>();
  @Input()
  public placeholder: string = '';
  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();
  //public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.debouncer//observable emite un valor
    .pipe(// el pipe tiene un operador que es debounceTime
      debounceTime(300)//espera 300mili segundo para esperar mas valores, si no llega otro valor en 1 segundo emite el valor
    )// luego le manda el valor al subscribe
    .subscribe( value => {
      this.onDebounce.emit(value);
    });
  }

  valueEmit( value : string): void{
    this.onValue.emit(value);
  }

  onKeyPress(searchTerm: string): void {
    this.debouncer.next(searchTerm);//next para hacer la siguiente emision
    //del observable

  }
}
