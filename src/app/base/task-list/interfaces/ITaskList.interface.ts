import {Observable} from "rxjs";
import {Task} from "../../main/interfaces/task";

export interface ITaskListInterface {
    getTasks(): Observable<Task[]>;
}
