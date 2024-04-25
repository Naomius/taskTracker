import { Injectable } from '@angular/core';
import {Status, Task, User} from "../../base/main/interfaces/task";
import {BehaviorSubject, map, Observable} from "rxjs";
import { TaskForm } from '../../base/main/interfaces/task-form';
import {TaskProperties} from "./enums/task-properties";

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    localTasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.loadTasks());

    constructor() {
    }

    private loadTasks(): Task[] {
        return Object.keys(localStorage)
            .filter(key => key.startsWith('task-'))
            .map(key => JSON.parse(localStorage.getItem(key) || 'null'));
    }

    public saveTask(task: TaskForm): void {
        localStorage.setItem(`task-${task.id}`, JSON.stringify(task));
        this.localTasks$.next(this.loadTasks());
    }

    public updateTaskStatus(taskId: string, newStatus: Status): void {
        this.updateTaskProperty(taskId, TaskProperties.Status, newStatus);
    }

    public updateAssignees(taskId: string, newAssignees: User): void {
        this.updateTaskProperty(taskId, TaskProperties.Assignees, newAssignees);
    }

    updateTaskProperty(taskId: string, propertyName: TaskProperties, newValue: any): void {
        const tasks = this.loadTasks();
        const task = tasks.find(task => task.id === taskId);
        if (task) {
            switch (propertyName) {
                case TaskProperties.Status:
                    task.status = newValue as Status;
                    break;
                case TaskProperties.Assignees:
                    task.assignees = newValue as User;
                    break;
            }
            localStorage.setItem(`task-${taskId}`, JSON.stringify(task));
            this.updateLocalTasks();
        }
    }

    private updateLocalTasks(): void {
        this.localTasks$.next(this.loadTasks());
    }

    public deleteTask(taskId: string): void {
        localStorage.removeItem(`task-${taskId}`);
        this.localTasks$.next(this.loadTasks());
    }

    getTaskById(id: string): Observable<Task | undefined> {
        return this.localTasks$.pipe(
            map(tasks => tasks.find(task => task.id === id))
        );
    }

    get LocalStorageTasks() {
        return this.localTasks$
    }
}
