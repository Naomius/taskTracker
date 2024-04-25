
export interface Task {
    id: string;
    title: string;
    deadline: Date;
    priority: Priority;
    status: Status;
    description: string;
    assignees: User;
}

export interface User {
    id: string;
    name: string;
}

export interface Priority {
    value: string;
    priority: string;
}

export interface Status {
    value: string;
    status: string;
}

export enum TaskPriority {
    Low = 'LOW',
    Medium = 'MEDIUM',
    High = 'HIGH',
}

export enum TaskStatus {
    New = 'NEW',
    InProgress = 'IN_PROGRESS',
    Done = 'DONE',
}

