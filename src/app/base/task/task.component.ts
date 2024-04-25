import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {TaskManagerServiceToken} from "./tokens/TaskManagerServiceToken";
import {TaskManagerService} from "./services/task-manager.service";
import {Observable, Subject, takeUntil} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {Status, Task, User} from "../main/interfaces/task";
import {AssigneesId, StatusId} from "./interfaces/status-id";

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrl: './task.component.scss',
    providers: [
        TaskManagerService,
        {
            provide: TaskManagerServiceToken,
            useExisting: TaskManagerService
        }
    ]
})
export class TaskComponent implements OnInit, OnDestroy{

    task$!: Observable<Task | undefined>;
    statusList$!: Observable<Status[]>;
    executors$!: Observable<User[]>;
    changeStatus$: Subject<StatusId> = new Subject<StatusId>();
    changeAssignees$: Subject<AssigneesId> = new Subject<AssigneesId>();

    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(@Inject(TaskManagerServiceToken) private facadeManager: TaskManagerService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.statusList$ = this.facadeManager.Status;
        this.executors$ = this.facadeManager.Users;
        this.initializeSideEffects();
    }

    initializeSideEffects(): void {
        this.activatedRoute.params.pipe(
            takeUntil(this.destroy$),
        ).subscribe((params: Params): void => {
            const taskId: string = params['id'];
           this.task$ = this.facadeManager.getTaskById(taskId);
        });

        this.changeStatus$.pipe(
            takeUntil(this.destroy$)
        ).subscribe(newStatus => {
            this.facadeManager.updateTaskStatus(newStatus);
        })

        this.changeAssignees$.pipe(
            takeUntil(this.destroy$)
        ).subscribe(newAssignee => {
            this.facadeManager.updateAssignees(newAssignee);
        })
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }
}



