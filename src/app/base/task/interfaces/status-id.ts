import {Status, User} from "../../main/interfaces/task";

export interface StatusId {
    taskId: string;
    newStatus: Status;
}
export interface AssigneesId {
    taskId: string;
    newAssignees: User;
}
