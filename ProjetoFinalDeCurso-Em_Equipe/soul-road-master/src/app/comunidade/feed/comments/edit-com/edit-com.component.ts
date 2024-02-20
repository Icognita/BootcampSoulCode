import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Comentario } from 'src/app/interfaces/comment';
import { Post } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-edit-com',
  templateUrl: './edit-com.component.html',
  styleUrls: ['./edit-com.component.css']
})
export class EditComComponent implements OnInit {

  @Input() post: Post = {} as Post
  comentario: Comentario = {} as Comentario

  onSubmit(){
    this.editComentario();
   }
 
 editComentario(){
     this.postService.updateComment(this.comentario).then(this.activeModal.dismiss)
   }

   constructor( private postService: PostService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
