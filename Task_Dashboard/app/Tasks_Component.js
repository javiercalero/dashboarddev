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
const app_dataservice_1 = require("./app.dataservice");
const task_1 = require("./models/task");
const app_constants_1 = require("./app.constants");
let AppComponent = class AppComponent {
    constructor(_dataService) {
        this._dataService = _dataService;
    }
    ngOnInit() {
        this.getAllItems();
    }
    getAllItems() {
        this._dataService
            .GetAll()
            .subscribe((data) => {
            this.myItems = data;
            for (let task of this.myItems) {
                task.disableEdit = true;
            }
        }, error => console.log(error), () => console.log('Get all Items complete'));
    }
    getItemById(id) {
        var myTask = new task_1.Task();
        this._dataService.GetSingle(id).subscribe((data) => myTask = data, error => console.log(error), () => console.log('Get Item by id complete'));
        return myTask;
    }
    addNewTask(todoInput) {
        if (todoInput.value != undefined && todoInput.value != "" && todoInput.value != 'Add a new task') {
            var myTask = new task_1.Task();
            myTask.name = todoInput.value;
            this._dataService.Add(myTask).subscribe((data) => { todoInput.placeholder = 'Add a new task'; this.ngOnInit(); }, error => console.log(error), () => console.log());
        }
    }
    updateTask(myTask) {
        this._dataService.Update(myTask).subscribe((data) => { this.ngOnInit(); }, error => console.log(error), () => console.log());
    }
    deleteTask(myTask) {
        this._dataService.Delete(myTask).subscribe((data) => { var res = data; this.ngOnInit(); }, error => console.log(error), () => console.log());
    }
    setEditState(myTask, state) {
        var lookupTask = [myTask].find(task => task._id == myTask._id);
        if (lookupTask != undefined)
            lookupTask.disableEdit = state;
    }
    keyDownFunction(event, todoText) {
        if (event.keyCode == 13) {
            this.addNewTask(todoText);
        }
    }
};
AppComponent = __decorate([
    core_1.Component({
        providers: [app_dataservice_1.DataService, app_constants_1.Configuration],
        selector: 'my-app',
        templateUrl: './views/tasklist.html',
    }),
    __metadata("design:paramtypes", [app_dataservice_1.DataService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=Tasks_Component.js.map