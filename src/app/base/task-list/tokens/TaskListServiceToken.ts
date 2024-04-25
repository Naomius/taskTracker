import {InjectionToken} from "@angular/core";
import {ITaskListInterface} from "../interfaces/ITaskList.interface";

export const TaskListServiceToken = new InjectionToken<ITaskListInterface>('TaskListServiceToken');
