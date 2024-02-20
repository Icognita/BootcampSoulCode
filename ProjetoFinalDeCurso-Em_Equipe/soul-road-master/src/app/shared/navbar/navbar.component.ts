import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RegisterData } from 'src/app/interfaces/register-data';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  constructor(
    public router: Router, 
    private authenticationService: AuthenticationService) { }

//cria o emissor para enviar o searchText para o outro componente:
  @Output() searchEmitter = new EventEmitter<string>();

  @Input() users: RegisterData = {} as RegisterData

  public User: RegisterData[] = []
  public usuario: RegisterData; 

  user_atual_id: string = ''
  id: number[] = [];

  user$?: Observable<any>;
  user: any;
  searchText: any;

  routerEventSubscription!: Subscription;
  currentRoute: string = '/';
  isMenuCollapsed: boolean = true;

  logout() {   
    this.authenticationService.logout();    
  }

  ngOnInit(): void {
    this.routerEventSubscription = this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationStart) {
        this.currentRoute = ev.url;
      }
    });
    this.user$ = this.authenticationService.user;


    //identificando usuario
    this.authenticationService.user.subscribe((user) => {
      if (user) {
        // pegando o uid do usuario logado..
        console.log("UID usuario atual =" + user.uid);
        this.user_atual_id = user.uid;       
      }
    });

    this.authenticationService.getUsers().subscribe(
      (user: RegisterData[]) => {
        this.User = user;
        console.log(this.User);
        for (let i = 0; i <= this.User.length; i++) {
          if (this.User[i].key == this.user_atual_id) {
            this.usuario = this.User[i];
            console.log("Usuario Logado: ", this.usuario.fullname);
          }

          this.id[i] = i + 1
        }
      }
    )

  }

  ngOnDestroy(): void {
    this.routerEventSubscription.unsubscribe();
  }
  
//cria uma função que vai usar o emitter criado acima para enviar o searchText para o componente pai (feed)
  searchInput(){
    this.searchEmitter.emit(this.searchText)
  }

}

