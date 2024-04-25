import {InjectionToken} from "@angular/core";
import {ITaskManagerInterface} from "../interfaces/TaskManager.interface";

export const MainPageManagerServiceToken = new InjectionToken<ITaskManagerInterface>('MainPageManagerServiceToken');
