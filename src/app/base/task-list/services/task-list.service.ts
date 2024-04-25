import { Injectable } from '@angular/core';
import {ITaskListInterface} from "../interfaces/ITaskList.interface";
import {Observable} from "rxjs";
import {Task} from "../../main/interfaces/task";
import {StorageService} from "../../../shared/services/storage.service";

@Injectable()
export class TaskListService implements ITaskListInterface{

  constructor(private storageService: StorageService) { }

    getTasks(): Observable<Task[]> {
        return this.storageService.LocalStorageTasks
    }
}
