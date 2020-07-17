import { Directive, ElementRef, Renderer2, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})
export class DropDownDirective {
  clicked = false;
  @HostBinding('class.open') isOpen = false;
  @HostListener('click') click() {
    this.isOpen = !this.isOpen;
    // if (this.clicked) {
    //   this.renderer.removeClass(this.elementRef.nativeElement, 'open');
    //   this.clicked = false;
    // } else {
    //   this.renderer.addClass(this.elementRef.nativeElement, 'open');
    //   this.clicked = true;
    // }
  }

  constructor() { }

}
