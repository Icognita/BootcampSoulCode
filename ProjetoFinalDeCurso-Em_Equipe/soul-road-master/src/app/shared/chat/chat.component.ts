import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Chat } from 'src/app/interfaces/chat';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  allMessages$?: Observable<Chat[]>;
  mensagem: Chat = {} as Chat;
  ehDono: boolean;  

  constructor(private chatService: ChatService, private authService: AuthenticationService) { }
  
  ngOnInit(): void {
    this.allMessages$ = this.chatService.getAllMessages();    
  }

  onSubmit(){
    this.addMensagem();
    this.mensagem.texto = null;
  }

  addMensagem(){
    this.chatService.addMensagem(this.mensagem);
  }

  deleteMensagem(mensagem: Chat) {
    let userLogado: string = this.authService.userData.uid;
    let uid: string = mensagem.uid;
    console.log(userLogado)
    if (userLogado === uid) {
      window.confirm('Tem certeza?') &&
        this.chatService.deleteMensagem(mensagem);
    } else {
      alert('Você não pode deletar a mensagem de outra pessoa!');
    }
  }

}
