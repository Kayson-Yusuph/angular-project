import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  clicked = false;
  @HostListener('click') click() {
    if (this.clicked) {
      this.renderer.removeClass(this.elementRef.nativeElement, 'open');
      this.clicked = false;
    } else {
      this.renderer.addClass(this.elementRef.nativeElement, 'open');
      this.clicked = true;
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

}
