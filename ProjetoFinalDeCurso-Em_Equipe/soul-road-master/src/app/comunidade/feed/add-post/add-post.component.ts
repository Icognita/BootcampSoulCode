import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';
import { UploadImageService } from 'src/app/services/upload-image.service';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  post: Post = {} as Post
  image: File | null = null  

  changeImage(images: FileList | null){
    if(images){
      this.image = images[0]
      document.getElementById("customFileLabel").innerHTML=this.image.name;
    }
  }

  onSubmit(){
    this.uploadService.uploadImage(this.image!, (url) => {
      this.post.imagePost = url
      this.addPost();
      alert("Postagem adicionada!")
    });
  }

  addPost(){
    this.postService.addPost(this.post).then(this.activeModal.dismiss)   
  }
  
  constructor(private postService: PostService, private uploadService: UploadImageService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void { }
}
