import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cate } from 'src/app/interfaces/categoria';
import { Quiz } from '../../interfaces/quiz';
import { QuizService } from '../../services/quiz.service';
import { RegisterData } from 'src/app/interfaces/register-data';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  allQuiz$?: Observable<Quiz[]>;
  @Input() categoria: Cate = {} as Cate

  @Input() users: RegisterData = {} as RegisterData;

  public User: RegisterData[] = [];
  public usuario: RegisterData;  

  user_atual_id: string = '';
  id: number[] = [];

  constructor(private quizService: QuizService, private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.allQuiz$ = this.quizService.getAllQuiz()

    this.authService.user.subscribe((user) => {
      if (user) {
        // pegando o uid do usuario logado..
        console.log('UID usuario atual =' + user.uid);
        this.user_atual_id = user.uid;
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

  deleteQuiz(quiz: Quiz) {
    let userLogado: string = this.authService.userData.uid;
    let uid: string = quiz.uid;
    console.log(userLogado);
    console.log(uid);

    if (userLogado === uid) {
      window.confirm('Tem certeza?') &&
        this.quizService.deleteQuiz(quiz);
    } else {
      alert('Você não pode deletar o quiz criado por outro usuário!');
    }
  }

  keyQuiz(quiz:Quiz){
    this.router.navigate(["/quiz-card", quiz.key])
  }  
}
