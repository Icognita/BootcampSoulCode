import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RegisterData } from 'src/app/interfaces/register-data';

@Component({
  selector: 'app-gerenciamento',
  templateUrl: './gerenciamento.component.html',
  styleUrls: ['./gerenciamento.component.css']
})
export class GerenciamentoComponent implements OnInit {

  @Input() users: RegisterData = {} as RegisterData
  public User: RegisterData[] = []
  public usuario: RegisterData;

  user_atual_id: string = ''
  id: number[] = [];

  constructor( private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      if (user) {
        // pegando o uid do usuario logado..
        console.log("UID usuario atual =" + user.uid);
        this.user_atual_id = user.uid;       
      }
    });

    this.authService.getUsers().subscribe(
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

}
