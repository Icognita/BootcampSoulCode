import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { SearchPipe } from './pipes/search.pipe';
import { ChatComponent } from './chat/chat.component';
import { EscondeDirective } from './chat/esconde.directive';
import { FloatDirective } from './chat/float.directive';

@NgModule({
  declarations: [
    SearchPipe, 
    ChatComponent, 
    EscondeDirective,
    FloatDirective
  ],
  imports: [
    CommonModule, 
    FormsModule
  ], 
  exports:[
    
    SearchPipe,
    ChatComponent,
    EscondeDirective,
    FloatDirective    
  ]
})
export class SharedModule { }
