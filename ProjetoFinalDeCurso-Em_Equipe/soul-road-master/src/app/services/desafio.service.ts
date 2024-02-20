import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { CateDesafios } from '../interfaces/categoriaDesafios';
import { Desafio } from '../interfaces/desafio';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DesafioService {

  constructor(
    private db: AngularFirestore,
    private authService: AuthenticationService) { }

  desafio: any;

  getallDesafios() {
    return this.db
      .collection<Desafio>('desafios', ref => ref.orderBy('dataHora', 'desc'))

      .snapshotChanges()
      .pipe(
        map((snapshots) => {
          return snapshots.map((doc) => {
            return {
              key: doc.payload.doc.id,
              ...doc.payload.doc.data(),
            } as Desafio;
          });
        })
      );
  }

  addDesafio(desafio: Desafio) {
    desafio.uid = this.authService.userData.uid;
    desafio.nomeCreator = this.authService.userData.displayName;
    desafio.dataHora = Date.now();

    return this.db.collection('desafios').add(desafio);
  }

  deleteDesafio(desafio: Desafio) {
    console.log(desafio.key);
    return this.db.collection('desafios').doc(desafio.key).delete();
  }  

  addCategoria(categoriaDesafios: CateDesafios){
    categoriaDesafios.uid = this.authService.userData.uid
    categoriaDesafios.criador = this.authService.userData.displayName
    return this.db.collection('categoriasDesafios').add(categoriaDesafios)
  }

  getAllCategoriaDesafios() {
    return this.db
      .collection<CateDesafios>('categoriasDesafios')
      .snapshotChanges()
      .pipe(
        map((snapshots) => {
          return snapshots.map((doc) => {
            return {
              key: doc.payload.doc.id,
              ...doc.payload.doc.data(),
            } as CateDesafios;
          });
        })
      );
  }
  
}
