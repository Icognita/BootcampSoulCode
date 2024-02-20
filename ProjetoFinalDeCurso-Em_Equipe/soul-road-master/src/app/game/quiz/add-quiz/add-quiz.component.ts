import { viewClassName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cate } from 'src/app/interfaces/categoria';
import { Quiz } from 'src/app/interfaces/quiz';
import { QuizAl } from 'src/app/interfaces/quizAl';

import { QuizService } from 'src/app/services/quiz.service';
import { UploadImageService } from 'src/app/services/upload-image.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],

})
export class AddQuizComponent implements OnInit {

  quiz: Quiz = {} as Quiz
  allCategoria?: Observable<Cate[]>
  categoria: Cate
  image: File | null = null
  valor: any

  onSubmit() {
    this.addQuiz()
  }

  addQuiz() {
    console.log(this.quiz);
    console.log(this.valor);

    this.quizService.addQuiz(this.quiz, this.valor);
    alert("Quiz adicionado com sucesso");

  }

  mudanca(){
    console.log(this.quiz.numeroPerguntas)

    this.quiz.numeroPerguntas = Number(this.quiz.numeroPerguntas)

    this.quiz.perguntas = [...Array(this.quiz.numeroPerguntas)].map(ref => {
      return {} as QuizAl
    })
    console.log(this.quiz)
  }

  log(){
    console.log(this.quiz)
  }

  constructor(private quizService: QuizService, private uploadService: UploadImageService) { }

  ngOnInit(): void {
    this.allCategoria = this.quizService.getAllCategoria()
    
  }

  pegaValor(valor): void{
    this.valor = valor;
    console.log("valor capturado: ", this.valor);
  }


}

