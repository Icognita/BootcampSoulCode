import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Resposta } from '../interfaces/resposta';
import { Desafio } from '../interfaces/desafio';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RespostaService {

  constructor(
    private db: AngularFirestore,
    private authService: AuthenticationService
  ) {

  }

  resposta: any;

  getRespostas(uid: string) {
    return this.db
      .collection<Resposta>('respostas', (ref) => ref.where('uid', '==', uid))

      .snapshotChanges()
      .pipe(
        map((snapshots) => {
          return snapshots.map((doc) => {
            return {
              key: doc.payload.doc.id,
              ...doc.payload.doc.data(),
            } as Resposta;
          });
        })
      );
  }

  getAllRespostas() {
    return this.db
      .collection<Resposta>('respostas', ref => ref.orderBy('dataHora', 'desc'))
      .snapshotChanges()
      .pipe(
        map((snapshots) => {
          return snapshots.map((doc) => {
            return {
              key: doc.payload.doc.id,
              ...doc.payload.doc.data(),
            } as Resposta;
          });
        })
      );
  }

  async addResposta(resposta: Resposta, desafio: Desafio) {
    const respostas = this.db.collection('respostas', ref => ref.orderBy('dataHora'));
    resposta.uid = this.authService.userData.uid;
    resposta.nome = this.authService.userData.displayName;   
    resposta.dataHora = Date.now();    
    resposta.desafioKey = desafio.key;
    resposta.nota = Number(desafio.pontuacao);
    console.log(resposta.desafioKey)
    console.log(resposta.nota)

    try {
      await respostas.add(resposta);
      alert('Resposta Enviada!');
    } catch (e) {
      return alert('Não foi possível enviar sua resposta.');
    }  
  }

  deleteResposta(resposta: Resposta) {
    console.log(resposta.key);
    return this.db.collection('respostas').doc(resposta.key).delete();
  }

  updateResposta(resposta: Resposta): Promise<void> {
    return this.db.collection('respostas').doc(resposta.key).update(resposta);
  }
  
}
