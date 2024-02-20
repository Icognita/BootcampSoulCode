import { Injectable } from '@angular/core';
import { Historic } from '../interfaces/historic.model';
import { Option, Quiz } from '../interfaces/quiz-card.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable()
export class QuizCardService {

   quizzes: Quiz[]
   = [
    new Quiz(1, "questão 1?", [ new Option("Alternativa Errada 1", false),new Option(  "Alternativa Errada 2", false),new Option(  "Alternativa Correta 3", true),new Option(  "Alternativa Errada 4", false) ,new Option(  "Alternativa Errada 5", false)]),
    new Quiz(2, "questão 2?", [ new Option("Alternativa Errada 1", false),new Option(  "Alternativa Errada 2", false),new Option(  "Alternativa Correta 3", true),new Option(  "Alternativa Errada 4", false) ,new Option(  "Alternativa Errada 5", false)]),
    new Quiz(3, "questão 3?", [ new Option("Alternativa Errada 1", false),new Option(  "Alternativa Errada 2", false),new Option(  "Alternativa Correta 3", true),new Option(  "Alternativa Errada 4", false) ,new Option(  "Alternativa Errada 5", false)]),
    new Quiz(4, "questão 4?", [ new Option("Alternativa Errada 1", false),new Option(  "Alternativa Errada 2", false),new Option(  "Alternativa Correta 3", true),new Option(  "Alternativa Errada 4", false) ,new Option(  "Alternativa Errada 5", false)]),
    new Quiz(5, "questão 5?", [ new Option("Alternativa Errada 1", false),new Option(  "Alternativa Errada 2", false),new Option(  "Alternativa Correta 3", true),new Option(  "Alternativa Errada 4", false) ,new Option(  "Alternativa Errada 5", false)])
  ];

  historic:Historic[]
  options: Option[]

  constructor(private db: AngularFirestore,) { }

  addQuiz(quantos: number, question: string, options: Option[]){
    for (let i=0; i< quantos; i++){
      this.quizzes.push(new Quiz(i+1, question, options ));
    }
    return this.db.collection('game').add(this.quizzes);
  }

  addOptions(quantosOp: number, text:string, isAnswer: boolean){
    for (let i=0; i<quantosOp; i++){
      this.options.push(new Option(text, isAnswer));
    }
  }

  listQuizzes(): Quiz[] {
    return this.quizzes;
  }

  readLocaStorage():Historic[]{
    return localStorage['historic'] ? JSON.parse(localStorage['historic']) : [];
  }

  saveQuizResult(points:number):void{
    const results = this.readLocaStorage()
    const curr_result = new Historic(points)
    results.push(curr_result);
    localStorage['historic'] = JSON.stringify(results);
  }
}
