import { ErrorService } from './error.service';
import { LoginData } from '../interfaces/login-data';
import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RegisterData } from '../interfaces/register-data';
import { Router } from '@angular/router';
import { FirebaseError } from '@firebase/util';
import { environment } from 'src/environments/environment';
import { Quiz } from '../interfaces/quiz';

import { observable, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private auth: AngularFireAuth, 
    private db: AngularFirestore, 
    private router: Router, 
    private errorService: ErrorService) {
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
  id: any  

  get user() {
    return this.auth.user;
  }

  errorEmitter = new EventEmitter<string>();

  //criar conta
  signup({ email, password, birthdate, fullname, phoneNumber, country, state, classroom }: RegisterData) {
    this.auth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        this.id = res.user.uid
        this.sendEmailVerification(res.user);
        res.user?.updateProfile({ displayName: fullname });
        this.db
          .collection('users')
          .doc(res.user?.uid)
          .set({ fullname, birthdate, email, phoneNumber, country, state, classroom, picProfile: '/assets/picPerfil.png', badges: [], isTeacher: 'Não', isAdmin: 'Não', userAuthorization: false, key: this.id, userPoints: 0 })
        alert("Cadastro realizado com sucesso! Em breve seu acesso será liberado.")
        this.router.navigate(['/']);
      },
      (err) => this.emitError(err.code)
    )
  }

  public async resetPassword(email: string): Promise<string> {
    try {
      const reset = {
        url: `${environment.baseURL}`,
        handleCodeInApp: true,
      };
      await this.auth.sendPasswordResetEmail(email, reset)
      this.router.navigate(['/home']);
      return "Enviamos para o seu e-mail um link de redefinição de senha.";
    } catch (error) {
      return error;
    }
  }

  //verif email/senha login
  public async login({ email, password }: LoginData) {
    this.auth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        this.router.navigate(['/feed'])
      },
      (err: FirebaseError) => this.emitError(err.code)
    );
  }

  public async logout() {
    this.auth.signOut()
      .then(() => {
        this.router.navigate(['/'])
      })
      .catch(error => console.log(error))
  }

  emitError(code: string) {
    this.errorEmitter.emit(this.errorService.formatError(code));
  }

  sendEmailVerification(user: any) {
    if (!user?.user?.emailVerified) {
      user?.sendEmailVerification();
    }
  }

  //listar usuarios
  getUsers() {
    return this.db.collection('users').valueChanges()
  }

  updateUsers(user: RegisterData) {
    console.log(this.auth.user)
    /*  user.key = this.auth.user */
    return this.db.collection('users').doc(user.key).update(user)
  }

  authRoute(): Observable<boolean> {
    return this.db.collection<RegisterData>('users').doc(this.userData.uid).valueChanges().pipe(switchMap(user => {
      console.log(this.userData.uid)
      return of(user.isAdmin === "Sim" || user.isTeacher === "Sim")
    }))
  }

  getCurrentUser() {
    return this.db.collection<RegisterData>('users').doc(this.userData.uid).valueChanges().pipe(switchMap(user => {
      console.log(user)
      return of(user)
    }))
  } 

  updateUserBadges(user: RegisterData) {
    return this.db.collection('users').doc(user.key).update(user)
  } 

  updateUserPoints(user: number) {
    console.log(this.userData.uid)
    return this.db.collection('users').doc(this.userData.uid).update(user)
  } 
}