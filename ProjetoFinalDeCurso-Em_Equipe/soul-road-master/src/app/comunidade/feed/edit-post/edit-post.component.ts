import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';
import { UploadImageService } from 'src/app/services/upload-image.service';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  post: Post = {} as Post
  image: File | null = null

  changeImage(images: FileList | null){
    if(images){
      this.image = images[0]
    }
  }

  onSubmit(){
    if(this.image){
      this.uploadService.uploadImage(this.image, (url) => {
        this.post.imagePost = url;
        this.updatePost();
      })
    }else{

      this.updatePost();
    }
  }

  updatePost(){
    this.postService.updatePost(this.post).then(this.activeModal.dismiss)
  }

  
  
  constructor(private postService: PostService, private uploadService: UploadImageService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
   
  }
}

