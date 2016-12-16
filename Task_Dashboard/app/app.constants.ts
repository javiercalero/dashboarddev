import { Injectable } from '@angular/core';
 
@Injectable()
export class Configuration {
    public Server: string = "http://localhost:1337";
    public ApiUrl: string = "/tasks";
    public ServerWithApiUrl = this.Server + this.ApiUrl;
}