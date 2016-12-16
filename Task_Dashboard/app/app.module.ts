import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './Tasks_Component';
import { HttpModule, Response, Headers } from '@angular/http';

@NgModule({
    imports: [BrowserModule, HttpModule],
    declarations: [AppComponent],
    exports: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }