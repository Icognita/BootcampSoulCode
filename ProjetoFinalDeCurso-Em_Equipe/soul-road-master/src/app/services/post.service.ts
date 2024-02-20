import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

import { Comentario } from '../interfaces/comment';
import { Post } from '../interfaces/post';
import { RegisterData } from '../interfaces/register-data';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root',
})
export class PostService {

  constructor(
    private db: AngularFirestore,
    private authService: AuthenticationService
  ) {}
    // this.auth.authState.subscribe((user) => (this.userData = user))
  

  post: any;

  curtissaum: boolean;

  public User: RegisterData[] = []
  public usuario: RegisterData;
  user_atual_id:string=''
  id: number[] = [];


  getPosts(uid: string) {
    return this.db
      .collection<Post>('posts', (ref) => ref.where('uid', '==', uid))
      .snapshotChanges()
      .pipe(
        map((snapshots) => {
          return snapshots.map((doc) => {
            return {
              key: doc.payload.doc.id,
              ...doc.payload.doc.data(),
            } as Post;
          });
        })
      );
  }

  getAllPosts() {
    return this.db
      .collection<Post>('posts', ref => ref.orderBy('dataHora', 'desc'))
      .snapshotChanges()
      .pipe(
        map((snapshots) => {
          return snapshots.map((doc) => {
            return {
              key: doc.payload.doc.id,
              ...doc.payload.doc.data(),
            } as Post;
          });
        })
      );
  }

  addPost(post: Post) {
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

    post.uid = this.authService.userData.uid;
    post.nome = this.authService.userData.displayName;
    post.turma = this.usuario.classroom;
    post.imageUri = this.usuario.picProfile;
    post.curtidas = [];
    post.dataHora = Date.now();

    return this.db.collection('posts').add(post);
  }

  deletePost(post: Post) {
    console.log(post.key);
    return this.db.collection('posts').doc(post.key).delete();
  }

  updatePost(post: Post): Promise<void> {
    return this.db.collection('posts').doc(post.key).update(post);
  }

  postCurtido(post: Post): number {
    var postagem = post;
    return postagem.curtidas.findIndex(
      (item: any) => item === this.authService.userData.uid
    );
  }

  // Verifica se o usuario curtiu o post e remove ou então adiciona a curtida.

  curtir(post: Post): void {
    console.log(post.key);
    var curtido = this.postCurtido(post);
    var postagem = post;

    if (curtido >= 0) {
      // Curtido é o index do ID do user no array quando encontrado.
      postagem.curtidas.pop();
      this.curtissaum = false;
    } else {
      // Se não tem o UID do usuário logado na lista de curtidas, adiciona.
      postagem.curtidas.push(this.authService.userData.uid);
      this.curtissaum = true;
    }

    try {
      this.updatePost(postagem)
        .then(() => console.log('Curtida atualizada.'))
        .catch(() => console.log('Erro ao atualizar curtida'));
    } catch (e) {
      console.log(e);
    }
  }

  // Calcula quantos item tem no array de curtidas e retorna o valor.
  postCurtidas(post: Post): number {
    return post.curtidas.length ? post.curtidas.length : null;
  }

  getComments(postKey: string) {
    return this.db
      .collection<Comentario>('comentarios', (ref) =>
        ref.where('postKey', '==', postKey)
      )
      .snapshotChanges()
      .pipe(
        map((snapshots) => {
          return snapshots.map((doc) => {
            return {
              key: doc.payload.doc.id,
              ...doc.payload.doc.data(),
            } as Comentario;
          });
        })
      );
  }

  async addComment(comentario: Comentario, post: Post) {

    const postagens = this.db.collection('comentarios', ref => ref.orderBy('dataHora'));
    comentario.uid = this.authService.userData.uid;
    comentario.nome = this.authService.userData.displayName;
    comentario.postKey = post.key;
    comentario.dataHora = Date.now();

    try {
      await postagens.add(comentario);
      alert('Comentário enviado!');
    } catch (e) {
      return alert('Não foi possível enviar seu comentário.');
    }
  }


  deleteComment(comentario: Comentario) {
    console.log(comentario.key);
    return this.db.collection('comentarios').doc(comentario.key).delete();
  }


  updateComment(comentario: Comentario): Promise<void> {
    return this.db.collection('comentarios').doc(comentario.key).update(comentario);
  }


}

