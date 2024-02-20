import { Routes } from "@angular/router";
import { HomeComponent } from "./home";
import { RegisterComponent } from "./register";
import { FeedComponent } from "./feed/feed.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import {
    hasCustomClaim,
    redirectUnauthorizedTo,
    redirectLoggedInTo,
    canActivate,
} from '@angular/fire/compat/auth-guard';
import { PerfilComponent } from "./perfil/perfil.component";
import { UsersComponent } from "./users/users.component";
import { AuthRouteGuard } from "../auth-route.guard";
import { GerenciamentoComponent } from "./gerenciamento/gerenciamento.component";
import { AddTurmaComponent } from "./add-turma/add-turma.component";
/* import { GuardAuthGuard } from "../guard-auth.guard"; */

const redirectLoggedInToFeed = () => redirectLoggedInTo(['feed']); //rota para o feed quando logado
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['home']);

export const ComunidadeRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        ...canActivate(redirectLoggedInToFeed)
    },
    {
        path: 'cadastro',
        component: RegisterComponent,
        ...redirectUnauthorizedToLogin
    },
    {
        path: 'redefinir',
        component: ResetPasswordComponent,
        ...redirectUnauthorizedToLogin
    },
    {
        path: 'feed',
        component: FeedComponent,
        ...canActivate(redirectUnauthorizedToLogin)
    },
    {
        path: 'perfil',
        component: PerfilComponent,
        ...canActivate(redirectUnauthorizedToLogin)
    },    
    {
        path: 'gerenciamento',
        component: GerenciamentoComponent,
        ...canActivate(redirectUnauthorizedToLogin),
        //canActivate: [AuthRouteGuard]
        
    },
    {
        path: 'gerenciamento/usuarios',
        component: UsersComponent,
        ...canActivate(redirectUnauthorizedToLogin),
        // canActivate: [AuthRouteGuard]
    },
    {
        path: 'gerenciamento/turmas',
        component: AddTurmaComponent,
        ...canActivate(redirectUnauthorizedToLogin),
        //canActivate: [AuthRouteGuard]
    }
]