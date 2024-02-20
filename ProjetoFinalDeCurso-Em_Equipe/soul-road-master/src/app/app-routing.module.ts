import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  hasCustomClaim,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/compat/auth-guard';
import { CommonModule } from '@angular/common';
import { ComunidadeModule } from './comunidade';
import { ComunidadeRoutes } from './comunidade/comunidade-routing.module';
import { GameRoutes } from './game/game-routing.module';

const redirectLoggedInToFeed = () => redirectLoggedInTo(['feed']); //rota para o feed quando logado
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['home']);

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/home',
    pathMatch: 'full'

  },
  ...ComunidadeRoutes,
  ...GameRoutes

];

@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    ComunidadeModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }