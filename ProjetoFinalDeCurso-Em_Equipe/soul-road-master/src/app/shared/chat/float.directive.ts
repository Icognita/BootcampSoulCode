import { Directive, ElementRef, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Directive({
  selector: '[appFloat]'
})
export class FloatDirective {

  @Input() appFloat: string;

  constructor( private el: ElementRef, private authService: AuthenticationService) { }

  ngOnInit(): void {
    let idUsuario = this.authService.userData.uid;
    if(this.appFloat === idUsuario){
      this.el.nativeElement.style.float='right';
      this.el.nativeElement.style.background='aquamarine';
    } else {
      this.el.nativeElement.style.float='left';
    } 
  }
}
