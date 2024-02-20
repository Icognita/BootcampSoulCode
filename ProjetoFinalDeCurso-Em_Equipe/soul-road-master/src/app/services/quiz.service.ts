import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { observable, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Cate } from '../interfaces/categoria';
import { Quiz } from '../interfaces/quiz';
import { QuizAl } from '../interfaces/quizAl';
import { RegisterData } from '../interfaces/register-data';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class QuizService {

  constructor(private db: AngularFirestore, private authService: AuthenticationService, private router: Router, private auth: AngularFireAuth) { 
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userData = user
        return this.db.doc<RegisterData>(`users/${user.uid}`).valueChanges()
      } else {
        return observable.valueOf()
      }
    });
  }

  user$: Observable<RegisterData>
  userData: any;
  get user() {
    return this.auth.user;
  }

  quiz: Quiz
  quizAl: QuizAl
  public User: RegisterData[] = []
  public usuario: RegisterData;
  user_atual_id:string=''
  id: number[] = [];  

  getAllQuiz() {
    return this.db
      .collection<Quiz>('quiz')
      .snapshotChanges()
      .pipe(
        map((snapshots) => {
          return snapshots.map((doc) => {
            return {
              key: doc.payload.doc.id,
              ...doc.payload.doc.data(),
            } as Quiz;
          });
        })
      );
  }

  getAllCategoria() {
    return this.db
      .collection<Cate>('categorias')
      .snapshotChanges()
      .pipe(
        map((snapshots) => {
          return snapshots.map((doc) => {
            return {
              key: doc.payload.doc.id,
              ...doc.payload.doc.data(),
            } as Cate;
          });
        })
      );
  }

  getCategoria(key: string) {
    return this.db
      .collection<Cate>('categorias').doc(key)
      .snapshotChanges()
      .pipe(
        map(snapshot => {
          let items = [];
              const data = snapshot.payload.data();
              const id = snapshot.payload.id;
              items.push({ id, ...data })
              return items as Cate[];
          })
      );
  }

  getQuiz(key: string) {
    return this.db
      .collection<Quiz>('quiz').doc(key)
      .snapshotChanges()
      .pipe(
        map(snapshot => {
          let items = [];
              const data = snapshot.payload.data();
              const id = snapshot.payload.id;
              items.push({ id, ...data })
              return items as Quiz[];
          })
      );
  }

  addCategoria(categoria: Cate){
    categoria.uid = this.authService.userData.uid
    categoria.criador = this.authService.userData.displayName
    return this.db.collection('categorias').add(categoria)
  }

  updateQuiz(quiz: Quiz){
    return this.db.collection('quiz').doc(quiz.key).update(quiz);
  }

  addQuiz(quiz: Quiz, valor: string){
    console.log(quiz)
    quiz.uid = this.authService.userData.uid
    quiz.nomeCriador = this.authService.userData.displayName
    quiz.selo = valor;
    quiz.pontuacao = Number(quiz.pontuacao)
    return this.db.collection('quiz').add(quiz)
  }

  deleteQuiz(quiz: Quiz) {
    console.log(quiz.key);
    return this.db.collection('quiz').doc(quiz.key).delete();
  }

  Selo(quiz: Quiz): void {
    this.authService.user.subscribe((user) => {
      if (user) {
        // pegando o uid do usuario logado..
       console.log("UID usuario atual ="+user.uid);
       this.user_atual_id=user.uid;     
      }      
    });

    this.authService.getUsers().subscribe(
      (user: RegisterData[]) => {
        this.User = user;    
        console.log(this.User);
        for (let i = 0; i <= this.User.length; i++) {
          if(this.User[i].key == this.user_atual_id){
            this.usuario= this.User[i];
             console.log("Usuario Logado: ",this.usuario.fullname);
          }
          this.id[i] = i + 1
        }
      }
    )

    let usuario = this.usuario;
    let usuario$ = this.usuario.userPoints;
    console.log(usuario$)

    usuario.badges.push(quiz.selo)
    console.log(usuario)

    try {
      this.authService.updateUserBadges(usuario)
        .then(() => console.log('Selo atualizada.'))
        .catch(() => console.log('Erro ao adicionar selo curtida'));
    } catch (e) {
      console.log(e);
    }
  }

  Pontos(quiz: Quiz): void {
    this.authService.user.subscribe((user) => {
      if (user) {
        // pegando o uid do usuario logado..
       console.log("UID usuario atual ="+user.uid);
       this.user_atual_id=user.uid;     
      }      
    });

    this.authService.getUsers().subscribe(
      (user: RegisterData[]) => {
        this.User = user;    
        console.log(this.User);
        for (let i = 0; i <= this.User.length; i++) {
          if(this.User[i].key == this.user_atual_id){
            this.usuario= this.User[i];
             console.log("Usuario Logado: ",this.usuario.fullname);
          }
          this.id[i] = i + 1
        }
      }
    )

    let usuario = this.usuario;
    usuario.userPoints += quiz.pontuacao
    console.log("PONTOS USUARIO", usuario)

    try {
      this.db.collection('users').doc(this.userData.uid).update(usuario)
        .then(() => console.log('Pontos atualizados.'))
        .catch(() => console.log('Erro ao adicionar pontos'));
    } catch (e) {
      console.log(e);
    }
  } 
}

