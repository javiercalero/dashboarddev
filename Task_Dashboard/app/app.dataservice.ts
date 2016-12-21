import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Task } from './models/task';
import { Configuration } from './app.constants';

@Injectable()
export class DataService {

    private actionUrl: string;
    private serverUrl: string;
    private headers: Headers;

    constructor(private _http: Http, private _configuration: Configuration) {

        this.actionUrl = _configuration.ServerWithApiUrl;
        this.serverUrl = _configuration.Server;

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public GetAll = (): Observable<Task[]> => {
        return this._http.get('/tasks')
            .map((response: Response) => response.json() as Task[])
            .catch(this.handleError);
    }

    public GetSingle = (id: string): Observable<Task> => {
        return this._http.get(this.serverUrl + '/task/' + id)
            .map((response: Response) => <Task>response.json())
            .catch(this.handleError);
    }

    public Add = (item: Task): Observable<Task> => {
        let toAdd = JSON.stringify(item);

        return this._http.post(this.serverUrl + '/addTask', toAdd, { headers: this.headers })
            .map((response: Response) => <Task>response.json())
            .catch(this.handleError);
    }

    public Update = (myTask: Task): Observable<Task> => {
        return this._http.post(this.serverUrl + '/updateTask/', JSON.stringify(myTask), { headers: this.headers })
            .map((response: Response) => <Task>response.json())
            .catch(this.handleError);
    }

    public Delete = (myTask: Task): Observable<Object> => {
        return this._http.post(this.serverUrl + '/deleteTask/', JSON.stringify(myTask), { headers: this.headers })
            .map((response: Response) => <Object>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}