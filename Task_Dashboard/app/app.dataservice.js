"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
const Observable_1 = require("rxjs/Observable");
const app_constants_1 = require("./app.constants");
let DataService = class DataService {
    constructor(_http, _configuration) {
        this._http = _http;
        this._configuration = _configuration;
        this.GetAll = () => {
            return this._http.get('/tasks')
                .map((response) => response.json())
                .catch(this.handleError);
        };
        this.GetSingle = (id) => {
            return this._http.get(this.serverUrl + '/task/' + id)
                .map((response) => response.json())
                .catch(this.handleError);
        };
        this.Add = (item) => {
            let toAdd = JSON.stringify(item);
            return this._http.post(this.serverUrl + '/addTask', toAdd, { headers: this.headers })
                .map((response) => response.json())
                .catch(this.handleError);
        };
        this.Update = (id, itemToUpdate) => {
            return this._http.put(this.serverUrl + '/updateTask/' + id, JSON.stringify(itemToUpdate), { headers: this.headers })
                .map((response) => response.json())
                .catch(this.handleError);
        };
        this.Delete = (id) => {
            return this._http.delete(this.serverUrl + '/deleteTask/' + id)
                .catch(this.handleError);
        };
        this.actionUrl = _configuration.ServerWithApiUrl;
        this.serverUrl = _configuration.Server;
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }
    handleError(error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    }
};
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, app_constants_1.Configuration])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=app.dataservice.js.map