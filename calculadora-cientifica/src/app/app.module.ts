import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { CalculadoraCientificaModule } from './calculadora-cientifica/';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CalculadoraCientificaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
