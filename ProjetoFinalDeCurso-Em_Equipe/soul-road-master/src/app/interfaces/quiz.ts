import { QuizAl } from "./quizAl";


export interface Quiz{
    nomeCriador: string,
    perguntas: QuizAl[],
    uid: string,
    pontuacao: number,
    assunto: string,
    numeroPerguntas: number,
    key?: string,
    selo: string
}