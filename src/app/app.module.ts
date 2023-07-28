import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
