import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Comentario } from 'src/app/interfaces/comment';
import { PostService } from 'src/app/services/post.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AddComComponent } from './add-com/add-com.component';
import { Post } from 'src/app/interfaces/post';
import { EditComComponent } from './edit-com/edit-com.component';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  allComments$?: Observable<Comentario[]>;
  flagAberto: boolean = false;

  @Input() post: Post = {} as Post;


  // @Input() comentario: Comentario = {} as Comentario;

  constructor(
    private postService: PostService,
    private modalService: NgbModal,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.allComments$ = this.postService.getComments(this.post.key);
  }


  openAddCommentModal(post: Post) {
    const modalRef = this.modalService.open(AddComComponent);
    modalRef.componentInstance.post = post;
  }


  deleteComment(comentario: Comentario) {
    let userLogado: string = this.authService.userData.uid;
    let uid: string = comentario.uid;
    console.log(userLogado);
    console.log(uid);

    if (userLogado === uid) {
      window.confirm('Tem certeza?') &&
        this.postService.deleteComment(comentario);
    } else {
      alert('Você não pode deletar o comentário de outra pessoa!');
    }

  }

  openUpdateCommentModal(comentario: Comentario) {
    let userLogado: string = this.authService.userData.uid;
    let uid: string = comentario.uid;

    if (userLogado === uid) {
      const modalRef = this.modalService.open(EditComComponent);
      modalRef.componentInstance.comentario = comentario;
    } else {
      alert('Você não pode editar o comentário de outra pessoa!');
    }
  }

  abreFecha(){
    this.flagAberto === false ? this.flagAberto = true : this.flagAberto = false;
    console.log(this.flagAberto);
  }


}
