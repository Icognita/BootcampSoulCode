import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LoginData } from 'src/app/interfaces/login-data';
import { RegisterData } from 'src/app/interfaces/register-data';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: LoginData = {} as LoginData;
  loginError: string = '';
  public User: RegisterData[] = []
  router: Router
  authResult: boolean

  onSubmit() {
    this.teste()
  }

  teste() {
    const Arrayuser = this.User.filter(email => email.email == this.data.email)
    Arrayuser.some(authorization => this.authResult = authorization.userAuthorization === true)
    if (this.authResult == true) {
      this.authenticationService.login(this.data)
    } else {
      alert("Aguardando Liberação")
      this.authenticationService.logout();
    }
  }

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.getUsers().forEach(
      (user: RegisterData[]) => {
        return this.User = user
      }
    )
    this.authenticationService.errorEmitter.subscribe((msg) => {
      this.loginError = msg;
    });
  }
}
