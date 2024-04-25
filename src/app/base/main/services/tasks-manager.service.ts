import { Injectable } from '@angular/core';
import {ITaskManagerInterface} from "../interfaces/TaskManager.interface";
import {Priority, Status, Task, User} from "../interfaces/task";
import {Observable, of} from "rxjs";
import {StorageService} from "../../../shared/services/storage.service";
import { TaskForm } from '../interfaces/task-form';
import {priority$, status$, users$} from "../../../shared/consts/usersAndPriorityData";

@Injectable()
export class TasksManagerService implements ITaskManagerInterface {

    constructor(private storageService: StorageService) {
    }

    get Priority(): Observable<Priority[]> {
        return priority$;
    }

    get Users(): Observable<User[]> {
        return users$;
    }

    get Status(): Observable<Status[]> {
        return status$;
    }

    createNewTask(data: TaskForm): Observable<Task> {
        const taskId = this.generateTaskId();
        this.storageService.saveTask({...data, id: taskId})

        return of(data as Task)
    }

    private generateTaskId(): string {
        return `task-${new Date().getTime()}`;
    }

    getTasks(): Observable<Task[]> {
        return this.storageService.LocalStorageTasks
    }

    deleteTask(taskId: string): void {
        this.storageService.deleteTask(taskId);
    }

}
