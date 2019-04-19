import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: 'input[entero]'
})
export class Numerico {
  constructor(private ref: ElementRef) {
  }
  @HostListener('input', ['$event'])
  onInput(event) {

    const value = event.target.value;

    if (value != null ) {
      const digits = value.replace(/[^0-9]/g, '');
      if (digits != value) {
          event.target.value = digits;

      }
    }
  }
}
