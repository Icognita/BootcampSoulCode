import { Routes } from "@angular/router";

import { HomeGameComponent } from "./home-game/home-game.component";
import { HistoricComponent } from "./quiz/historic/historic.component";
import { AddQuizComponent } from "./quiz/add-quiz/add-quiz.component";
import { QuizCardComponent } from "./quiz/quiz-card/quiz-card.component";
import { QuizComponent } from "./quiz/quiz.component";
import { DesafiosComponent } from "./desafios/desafios.component";
import { AddDesafioComponent } from "./desafios/add-desafio/add-desafio.component";
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/compat/auth-guard";
import { AuthRouteGuard } from "../auth-route.guard";
import { AddCategoriaComponent } from "./quiz/add-categoria/add-categoria.component";
import { RespostaComponent } from "./desafios/resposta/resposta.component";
import { AddCategoriaDesafiosComponent } from "./desafios/add-categoria-desafios/add-categoria-desafios.component";

const redirectLoggedInToFeed = () => redirectLoggedInTo(['feed']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['home']);

export const GameRoutes: Routes = [
    {
        path: 'game',
        component: HomeGameComponent,
        ...canActivate(redirectUnauthorizedToLogin)
       
    },
    {
        path: 'game/quiz',
        component: QuizComponent,
        ...canActivate(redirectUnauthorizedToLogin)
        
    },
    {
        path: 'game/hist',
        component: HistoricComponent,
        ...canActivate(redirectUnauthorizedToLogin)
    },
    {
        path: 'quiz-card/:key',
        component: QuizCardComponent,
        ...canActivate(redirectUnauthorizedToLogin)
    },
    {
        path: 'gerenciamento/add-quiz',
        component: AddQuizComponent,
        ...canActivate(redirectUnauthorizedToLogin),
        //canActivate: [AuthRouteGuard]
    },
    {
        path: 'gerenciamento/add-categoria',
        component: AddCategoriaComponent,
        ...canActivate(redirectUnauthorizedToLogin),
        //canActivate: [AuthRouteGuard]
    },
    {
        path: 'gerenciamento/add-categoriaDesafios',
        component: AddCategoriaDesafiosComponent,
        ...canActivate(redirectUnauthorizedToLogin),
        //canActivate: [AuthRouteGuard]
    },
    {
        path: 'game/desafios',
        component: DesafiosComponent,
        ...canActivate(redirectUnauthorizedToLogin)
    },
    {
        path: 'gerenciamento/respostas',
        component: RespostaComponent,
        ...canActivate(redirectUnauthorizedToLogin)
    },
    {
        path: 'gerenciamento/add-desafio',
        component: AddDesafioComponent,
        ...canActivate(redirectUnauthorizedToLogin),
        //canActivate: [AuthRouteGuard]
    }
]