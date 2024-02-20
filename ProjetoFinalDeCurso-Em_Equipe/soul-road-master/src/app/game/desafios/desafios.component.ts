import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { DesafioService } from 'src/app/services/desafio.service';
import { Desafio } from 'src/app/interfaces/desafio';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterData } from 'src/app/interfaces/register-data';
import { AddRespostaComponent } from './resposta/add-resposta/add-resposta.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-desafios',
  templateUrl: './desafios.component.html',
  styleUrls: ['./desafios.component.css']
})

export class DesafiosComponent implements OnInit {

  allDesafios?: Observable <Desafio[]>;
  static allDesafios: any;

  @Input() users: RegisterData = {} as RegisterData;

  public User: RegisterData[] = [];
  public usuario: RegisterData;  

  user_atual_id: string = '';
  id: number[] = [];

  constructor(
    private desafiosService: DesafioService,
    private modalService: NgbModal, 
    private authService: AuthenticationService ) {}

  ngOnInit(): void {
    this.allDesafios = this.desafiosService.getallDesafios();

    this.authService.user.subscribe((user) => {
      if (user) {
        // pegando o uid do usuario logado..
        console.log('UID usuario atual =' + user.uid);
        this.user_atual_id = user.uid;
      }
    });

    this.authService.getUsers().subscribe((user: RegisterData[]) => {
      this.User = user;
      console.log(this.User);
      for (let i = 0; i <= this.User.length; i++) {
        if (this.User[i].key == this.user_atual_id) {
          this.usuario = this.User[i];
          console.log('Usuario Logado: ', this.usuario.fullname);
        }

        this.id[i] = i + 1;
      }
    });
  }

  openAddRespostaModal(desafio) {
    const modalRef = this.modalService.open(AddRespostaComponent);
    modalRef.componentInstance.desafio = desafio;
  }

  deleteDesafio(desafio: Desafio) {
    let userLogado: string = this.authService.userData.uid;
    let uid: string = desafio.uid;
    console.log(userLogado);
    console.log(uid);

    if (userLogado === uid) {
      window.confirm('Tem certeza?') &&
        this.desafiosService.deleteDesafio(desafio);
    } else {
      alert('Você não pode deletar o desafio criado por outro usuário!');
    }
  }

}
