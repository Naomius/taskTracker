import {Observable} from "rxjs";
import {Priority, Status, User} from "./task";
import {TaskForm} from "./task-form";

export interface ITaskManagerInterface {
    Users: Observable<User[]>;
    Priority: Observable<Priority[]>;
    Status: Observable<Status[]>
    getTasks(): Observable<TaskForm[]>;
    createNewTask(data: TaskForm): Observable<any>;
    deleteTask(taskId: string): void;
}
