import { Component, OnInit, Input} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PostService } from 'src/app/services/post.service';
import { RegisterData } from 'src/app/interfaces/register-data';
import { AddPostComponent } from '../feed/add-post/add-post.component';
import { EditPostComponent } from '../feed/edit-post/edit-post.component';
import { UpdateUsersComponent } from '../users/update-users/update-users.component';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {

  @Input() user: RegisterData;  
 
  public User: RegisterData[] = []
  public usuario: RegisterData;

  likeSrc: string = '../../../assets/like.png';
  likedSrc: string = '../../../assets/heart.png';
  
  posts$?: Observable<Post[]>;
  searchText: any;
  user_atual_id:string=''
  id: number[] = [];

  constructor(
    private postService: PostService,
    private authService: AuthenticationService,
    private modalService: NgbModal) {

  }

  ngOnInit(): void { 
    this.authService.user.subscribe((user) => {
      if (user) {
        // pegando o uid do usuario logado..
       console.log("UID usuario atual ="+user.uid);
       this.user_atual_id=user.uid;
        this.posts$ = this.postService.getPosts(user.uid);        
      }      
    });

    /**
     * Pega os usuarios,armazena o UID atual na variavel user_atual_id,
     * e salva o usuario atual na variavel usuario: RegisterData
     */    
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
  }

  openUpdateUserModal(users: RegisterData) {
    const modalRef = this.modalService.open(UpdateUsersComponent);
    modalRef.componentInstance.users = users;    
  } 

  openAddPostModal() {
    this.modalService.open(AddPostComponent)
  }

  openUpdatePostModal(post: Post) {
    const ref = this.modalService.open(EditPostComponent);
    ref.componentInstance.post = post
  }

  deletePost(post: Post) {
    window.confirm('Tem certeza?') && this.postService.deletePost(post);
  }

  curtir(post: Post) {
    this.postService.curtir(post)
  }

  postCurtidas(post: Post): number {
    return this.postService.postCurtidas(post);
  }

}
