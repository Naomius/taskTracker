import {InjectionToken} from "@angular/core";
import {ITask} from "../interfaces/ITask.interface";

export const TaskManagerServiceToken = new InjectionToken<ITask>('TaskManagerServiceToken');
