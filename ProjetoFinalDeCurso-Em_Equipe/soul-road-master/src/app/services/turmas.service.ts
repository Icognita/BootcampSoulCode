import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Turma } from '../interfaces/turma';

@Injectable({
  providedIn: 'root'
})
export class TurmasService {

  addTurma(turma: Turma){
    turma.uid = this.authService.userData.uid
    turma.criador = this.authService.userData.displayName
    return this.db.collection('turmas').add(turma)
  }

  getAllTurmas() {
    return this.db
      .collection<Turma>('turmas')
      .snapshotChanges()
      .pipe(
        map((snapshots) => {
          return snapshots.map((doc) => {
            return {
              key: doc.payload.doc.id,
              ...doc.payload.doc.data(),
            } as Turma;
          });
        })
      );
  }

  constructor(private db: AngularFirestore, private authService: AuthenticationService) { }
}
