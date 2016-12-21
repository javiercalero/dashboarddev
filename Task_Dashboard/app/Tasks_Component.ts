import {Component, OnInit } from "@angular/core";
import { DataService } from "./app.dataservice";
import { Task } from "./models/task";
import { Configuration } from "./app.constants";

@Component({
    providers: [DataService, Configuration],
    selector: 'my-app',
    templateUrl: './views/tasklist.html',
})

export class AppComponent implements OnInit {
    public myItems: Task[];
    
    constructor(private _dataService: DataService) { }

    ngOnInit() {
        this.getAllItems();
    }

    
    private getAllItems(): void {
        this._dataService
            .GetAll()
            .subscribe((data: Task[]) => {
                this.myItems = data;
                for (let task of this.myItems) {
                    task.disableEdit = true;
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'));
    }

    public getItemById(id: string): Task {
        var myTask: Task = new Task();

        this._dataService.GetSingle(id).subscribe((data: Task) => myTask = data,
            error => console.log(error),
            () => console.log('Get Item by id complete'));

        return myTask;
    }

    public addNewTask(name): void {
        if (name.value != undefined && name.value != "" && name.value != 'Add a new task') {
            var myTask = new Task();
            myTask.name = name.value;
            this._dataService.Add(myTask).subscribe((data: Task) => { myTask = data; this.getAllItems(); },
                error => console.log(error),
                () => console.log());
        }
    }

    public updateTask(myTask: Task): void {
        this._dataService.Update(myTask).subscribe((data: Task) => { myTask = data; this.getAllItems();},
            error => console.log(error),
            () => console.log());
    }

    public deleteTask(id: string): void {
        this._dataService.Delete(id);
    }

    public setEditState(myTask: Task, state: boolean): void {
        var lookupTask = [myTask].find(task => task._id == myTask._id);

        if (lookupTask != undefined)
            lookupTask.disableEdit = state;
    }
}