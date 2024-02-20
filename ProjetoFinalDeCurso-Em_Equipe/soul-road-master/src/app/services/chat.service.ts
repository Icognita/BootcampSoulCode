
import { DatePipe } from '@angular/common';

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Chat } from '../interfaces/chat';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private db: AngularFirestore,
    private authService: AuthenticationService
  ) { }
// uma collection para cada turma
// uma página de select com os chats com as turmas disponíveis
// collection 
  getAllMessages() {
    return this.db
      .collection<Chat>('chat', ref => ref.orderBy('dataHora'))
      .snapshotChanges()
      .pipe(
        map((snapshots) => {
          return snapshots.map((doc) => {
            return {
              key: doc.payload.doc.id,
              ...doc.payload.doc.data(),
            } as Chat;
          });
        })
      );
  }

  async addMensagem(mensagem: Chat) {
    const chat = this.db.collection('chat'); // collection da turma
    // const dataHora = new Date;
    console.log(mensagem);
    mensagem.uid = this.authService.userData.uid;
    mensagem.nome = this.authService.userData.displayName;
    mensagem.dataHora = Date.now();

    try {
      await chat.add(mensagem);
      console.log('Mensagem enviada!');
    } catch (e) {
      return console.log('Não foi possível enviar sua mensagem.');
    }
  }

  deleteMensagem(mensagem: Chat) {
    return this.db.collection('chat').doc(mensagem.key).delete();
  }
}
