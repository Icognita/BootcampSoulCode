import { Directive, ElementRef, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Directive({
  selector: '[appEsconde]'
})
export class EscondeDirective {

  @Input() 
  
  appEsconde: string;

  constructor( private el: ElementRef, private authService: AuthenticationService) { }

  ngOnInit(): void {
    let idUsuario = this.authService.userData.uid;
    if(this.appEsconde !== idUsuario){
      this.el.nativeElement.style.display='none';
    } 
  }
}

