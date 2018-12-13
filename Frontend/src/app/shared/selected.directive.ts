import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
    selector: '[appSelected]'
})
export class SelectedDirective {
    @HostBinding('class.active') isSelected = false;

    @HostListener('document:click', ['$event'])
    clickout(event) {
        console.log('funciona');
      if (this.eRef.nativeElement.contains(event.target)) {
        this.isSelected = true;
      } else {
        this.isSelected = false;
      }
    }

    constructor(private eRef: ElementRef) {
      }

    /*@HostListener('click') toggleSelect() {
        this.isSelected = true;
    }
    @HostListener('clickOutside') removeSelect() {
        console.log('outside');
    }*/
}