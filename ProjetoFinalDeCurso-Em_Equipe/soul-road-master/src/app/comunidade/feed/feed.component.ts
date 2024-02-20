import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';
import { AddPostComponent } from './add-post/add-post.component';
import { RegisterData } from 'src/app/interfaces/register-data';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  @Input() user: RegisterData;

  public User: RegisterData[] = [];
  public usuario: RegisterData;
  posts$?: Observable<Post[]>;
  user_atual_id: string = '';
  id: number[] = [];

  allPosts$?: Observable<Post[]>;
  static allPosts$: any;
  searchText: any;
  flagAberto: boolean = false;
  likeSrc: string = '../../../assets/like.png';
  likedSrc: string = '../../../assets/heart.png';

  constructor(
    private postService: PostService,
    private modalService: NgbModal,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.allPosts$ = this.postService.getAllPosts();

    this.authService.user.subscribe((user) => {
      if (user) {
        // pegando o uid do usuario logado..
        console.log('UID usuario atual =' + user.uid);
        this.user_atual_id = user.uid;
        this.posts$ = this.postService.getPosts(user.uid);
      }
    });

    this.authService.getUsers().subscribe((user: RegisterData[]) => {
      this.User = user;
      console.log(this.User);
      for (let i = 0; i <= this.User.length; i++) {
        if (this.User[i].key == this.user_atual_id) {
          this.usuario = this.User[i];
          console.log('Usuario Logado: ', this.usuario.fullname);
        }

        this.id[i] = i + 1;
      }
    });
  }

  curtir(post: Post) {
    this.postService.curtir(post);
  }

  postCurtidas(post: Post): number {
    return this.postService.postCurtidas(post);
  }

  openAddPostModal() {
    this.modalService.open(AddPostComponent);
  }

  abreFecha() {
    this.flagAberto === false
      ? (this.flagAberto = true)
      : (this.flagAberto = false);
    console.log(this.flagAberto);
  }

  mostraImgUserAtual(post) {
    if (post.uid == this.usuario.key) {
      return this.usuario.picProfile;
    } else {
      return post.imageUri;
    }
  }
}
