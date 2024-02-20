import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { Quiz } from 'src/app/interfaces/quiz';
import { QuizService } from 'src/app/services/quiz.service';

import { ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { QuizAl } from 'src/app/interfaces/quizAl';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RegisterData } from 'src/app/interfaces/register-data';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.css'],
})
export class QuizCardComponent implements OnInit {
  id: number;
  quiz$: Observable<Quiz[]>;
  quizKey: string;
  contador: number;
  qtdQuiz: number;
  respondida: boolean;
  correta: boolean;
  progressoPerg: number;
  progresso: number;
  pontos: number;
  quizzes: QuizAl[];
  quizAtual: QuizAl;
  quizArray = [];  
  quizAtual$: Observable<QuizAl[]>;

  quizSelo: Quiz
  public usuario: RegisterData;
  Arrayuser: RegisterData[] 
  public User: RegisterData[] = [] 
  user_atual_id: string = '' 
  uzer: any
  quiZ: Quiz
  flag: boolean = false;

  timeLeft: number = 20;
  interval;

  @Input() quiz: Quiz = {} as Quiz;
  @Input() users: RegisterData = {} as RegisterData 

  
  @ViewChild('quizCardForm', { static: true })
  quizCardForm: NgForm;

  constructor(
    private quizService: QuizService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => { });  

    this.quizKey = this.activatedRoute.snapshot.paramMap.get('key');
    console.log(this.quizKey);
    this.quiz$ = this.quizService.getQuiz(this.quizKey);

    this.correta = false;
    this.contador = 0;
    this.startTimer();

    this.authService.user.subscribe((user) => {
      if (user) {
        // pegando o uid do usuario logado..
        console.log("UID usuario atual =" + user.uid);
        this.user_atual_id = user.uid;
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
  }

  getQuizProps(quiz) {
    this.qtdQuiz = quiz.numeroPerguntas;
    this.quizzes = quiz.perguntas;
    this.quizAtual = this.quizzes[this.contador];
    this.quizSelo = quiz.selo
    this.quiZ = quiz
    
    this.quizArray.push(this.quizAtual);
    console.log(this.quizArray);
    console.log(this.quizSelo);
    
    this.progressoPerg = 100 / this.quizzes.length;
    this.progressoPerg
    this.progresso = 0;
    this.pontos = 0;
    console.log(this.quizAtual);
    console.log(quiz.perguntas);
  }  

  selectResposta(selected: string, respCerta: string) {
    this.respondida = true;
    if (selected === respCerta) {
      this.correta = true;
    }
    console.log('respondida: ', this.respondida, 'correta: ', this.correta);
  }

  nextQuestion() {
    let aux = 1;
    this.checkAnswer();
    this.progresso += this.progressoPerg;
    this.progresso
    console.log("progresso: ", this.progresso, "progressoPerg: ", this.progressoPerg, "timeLeft: ", this.timeLeft);
    if (this.contador < this.quizzes.length) {
      this.timeLeft = 20;
      this.contador += aux;
      this.quizAtual = this.quizzes[this.contador];
      this.quizArray.pop();
      this.quizArray.push(this.quizAtual);
    } else if (this.progresso >= 100) {
      this.timeLeft = -1;
    }
    console.log(this.pontos);
    // this.saveResult();
    this.reset();
  }

  teste() {
    if (this.flag == false){
      this.quizService.Selo(this.quiZ)
      this.quizService.Pontos(this.quiZ)
      this.flag = true
      alert("Selo adicionado com sucesso!")
    } else {
      alert("O selo já foi adicionado!")
    }
    
  }

  addClass(id: any) {
    this.id = id;
  }

  checkAnswer() {
    if (this.correta) {
      this.pontos += this.progressoPerg;
    }
  }

  reset() {
    this.respondida = false;
    this.correta = false;
    this.id = null;
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else if (this.contador < this.quizzes.length) {
        this.nextQuestion();
      } else if (this.timeLeft <= -1) {
        this.pauseTimer();
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

}

