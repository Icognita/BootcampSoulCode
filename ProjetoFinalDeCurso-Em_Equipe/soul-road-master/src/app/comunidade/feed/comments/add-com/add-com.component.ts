import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Comentario } from 'src/app/interfaces/comment';
import { Post } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-add-com',
  templateUrl: './add-com.component.html',
  styleUrls: ['./add-com.component.css']
})
export class AddComComponent implements OnInit {

  @Input() post: Post = {} as Post
  comentario: Comentario = {} as Comentario
  
  onSubmit(){
     this.addComentario();
    }
  
  addComentario(){
      this.postService.addComment(this.comentario, this.post).then(this.activeModal.dismiss)
    }

  constructor( private postService: PostService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {

  }  

}


