import {Priority, Status, User} from "./task";
import {FormControl} from "@angular/forms";

export interface TaskForm {
    id: string;
    title: string | null;
    deadline: Date | null;
    priority: Priority | null;
    status: Status | null;
    description: string | null;
    assignees: User | null;
}

type PartialFormTaskFormControls<T> = {
    [K in keyof T]?: FormControl<T[K]>
};

export type TaskFormData = PartialFormTaskFormControls<TaskForm>;
