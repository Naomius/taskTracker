import { Injectable } from '@angular/core';
import {ITask} from "../interfaces/ITask.interface";
import {StorageService} from "../../../shared/services/storage.service";
import {Observable} from "rxjs";
import {Status, Task, User} from "../../main/interfaces/task";
import {status$, users$} from "../../../shared/consts/usersAndPriorityData";
import {AssigneesId, StatusId} from "../interfaces/status-id";

@Injectable()
export class TaskManagerService implements ITask{

  constructor(private storageService: StorageService) { }

    get Users(): Observable<User[]> {
        return users$;
    }

    get Status(): Observable<Status[]> {
        return status$;
    }

    updateTaskStatus(data: StatusId): void {
      console.log(data)
        this.storageService.updateTaskStatus(data.taskId, data.newStatus);
    }
    updateAssignees(data: AssigneesId): void {
        this.storageService.updateAssignees(data.taskId, data.newAssignees);
    }

    getTaskById(id: string): Observable<Task | undefined> {
        return this.storageService.getTaskById(id);
    }
}
