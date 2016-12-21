import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './Tasks_Component';
import { HttpModule, Response, Headers } from '@angular/http';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule],
    declarations: [AppComponent],
    exports: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }