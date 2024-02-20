import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { AngularFireStorageModule } from '@angular/fire/compat/storage'
import { AngularFireAuthModule } from '@angular/fire/compat/auth' 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { ComunidadeModule } from './comunidade';
import { HomeComponent } from './comunidade/home';
import { RegisterComponent } from './comunidade/register';
import { ResetPasswordComponent } from './comunidade/reset-password';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { UpdateUsersComponent, UsersComponent } from './comunidade/users';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { GameModule } from './game';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

import { AuthenticationService } from './services/authentication.service';
import { ChatService } from './services/chat.service';
import { ErrorService } from './services/error.service';
import { PostService } from './services/post.service';
import { UploadImageService } from './services/upload-image.service';


import { FeedComponent } from './comunidade/feed/feed.component';
import { AddPostComponent } from './comunidade/feed/add-post/add-post.component';
import { EditPostComponent } from './comunidade/feed/edit-post/edit-post.component';
import { PerfilComponent } from './comunidade/perfil/perfil.component';
import { CommentsComponent } from './comunidade/feed/comments/comments.component';
import { AddComComponent } from './comunidade/feed/comments/add-com/add-com.component';
import { QuizCardComponent } from './game/quiz/quiz-card';
import { QuizComponent } from './game/quiz';
import { AddQuizComponent } from './game/quiz/add-quiz/add-quiz.component';
import { NgInitDirective } from './directives/nginit.directive';
import { DesafiosComponent } from './game/desafios/desafios.component';
import { HomeGameComponent } from './game/home-game/home-game.component';
import { AddDesafioComponent } from './game/desafios/add-desafio/add-desafio.component';
import { QuizCardService } from './services/quiz-card.service';
import { HistoricService } from './services/historic.service';
import { NavbarComponent } from './shared/navbar';
import { QuizService } from './services/quiz.service';
import { EditComComponent } from './comunidade/feed';
import { HistoricComponent } from './game/quiz/historic/historic.component';
import { AddCategoriaComponent } from './game/quiz/add-categoria/add-categoria.component';
import { MaterialModule } from './material-module';
import { AddRespostaComponent } from './game/desafios/resposta/add-resposta/add-resposta.component';
import { RespostaComponent } from './game/desafios/resposta/resposta.component';
import { RespostaService } from './services/resposta.service';

import { AddCategoriaDesafiosComponent } from './game/desafios/add-categoria-desafios/add-categoria-desafios.component';
import { GerenciamentoComponent } from './comunidade/gerenciamento/gerenciamento.component';
import { AddTurmaComponent } from './comunidade/add-turma/add-turma.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { OrderModule } from 'ngx-order-pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    ResetPasswordComponent,
    GerenciamentoComponent,
    AddTurmaComponent,

    UsersComponent,
    UpdateUsersComponent,

    FeedComponent,
    AddPostComponent,
    EditPostComponent,
    EditPostComponent,

    CommentsComponent,
    AddComComponent,
    EditComComponent,

    PerfilComponent, 

    AddCategoriaComponent,
    QuizCardComponent,
    QuizComponent,
    AddQuizComponent,
    NgInitDirective,     

    HomeGameComponent,
    DesafiosComponent,
    AddDesafioComponent,
    RespostaComponent,
    AddRespostaComponent,
    AddCategoriaDesafiosComponent,

    HistoricComponent,

    NavbarComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ComunidadeModule,
    SharedModule,

    ReactiveFormsModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,

    GameModule,
    BrowserAnimationsModule,
    
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule, 
    MaterialModule,
    ImageCropperModule,
    OrderModule
  ],
  providers: [
    AuthenticationService,
    QuizService,
    ChatService,
    ErrorService,
    PostService,
    RespostaService,
    UploadImageService,
    QuizCardService, HistoricService, { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
