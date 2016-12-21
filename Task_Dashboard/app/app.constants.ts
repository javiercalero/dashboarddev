import { Injectable } from '@angular/core';
 
@Injectable()
export class Configuration {
    public Server: string = 'http://' + window.location.host;
    public ApiUrl: string = "/tasks";
    public ServerWithApiUrl = this.Server + this.ApiUrl;
}