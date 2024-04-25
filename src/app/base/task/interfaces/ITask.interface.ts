import {Observable} from "rxjs";
import {Status, Task, User} from "../../main/interfaces/task";
import {StatusId} from "./status-id";

export interface ITask {
    Users: Observable<User[]>;
    Status: Observable<Status[]>;
    updateTaskStatus(data: StatusId): void;
    getTaskById(id: string): Observable<Task | undefined>;
}
