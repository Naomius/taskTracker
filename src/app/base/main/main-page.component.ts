import {Component, Inject, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {filter, map, Observable, of, Subject, switchMap, takeUntil, withLatestFrom} from "rxjs";
import moment from "moment";
import 'moment/locale/ru';
import {TasksManagerService} from "./services/tasks-manager.service";
import {MainPageManagerServiceToken} from "./tokens/MainPageManagerServiceToken";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Priority, Status, User} from "./interfaces/task";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TaskForm, TaskFormData} from "./interfaces/task-form";

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.scss',
    providers: [
        TasksManagerService,
        {
            provide: MainPageManagerServiceToken,
            useExisting: TasksManagerService
        }
    ]
})
export class MainPageComponent implements OnInit, OnDestroy {
    @ViewChild('createTaskTemplate') createTaskTemplateRef!: TemplateRef<unknown>;

    taskCreationForm: FormGroup<TaskFormData> = new FormGroup<TaskFormData>({
        title: new FormControl<TaskForm["title"]>(null, Validators.required),
        deadline: new FormControl<TaskForm["deadline"]>(null),
        priority: new FormControl<TaskForm["priority"]>(null),
        status: new FormControl<TaskForm["status"]>(null),
        assignees: new FormControl<TaskForm["assignees"]>(null),
        description: new FormControl<TaskForm["description"]>(null),
    })

    private dialogRef!: MatDialogRef<any>;

    tasks$!: Observable<TaskForm[]>;
    dateNow$!: Observable<string>;
    executors$!: Observable<User[]>;
    priorityList$!: Observable<Priority[]>;
    statusList$!: Observable<Status[]>;
    confirmTaskCreat$!: Observable<TaskForm>;

    creatTaskBtnClick$: Subject<void> = new Subject<void>();
    confirmTaskBtnClick$: Subject<void> = new Subject<void>();
    deleteTaskBtn$: Subject<string> = new Subject<string>();
    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(@Inject(MainPageManagerServiceToken) private facadeManager: TasksManagerService,
                private dialog: MatDialog,
                private snakeBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.dateNow$ = of(moment()).pipe(
            map(date => {
                let formattedDate = date.format('dddd, D MMMM');
                return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
            })
        )

        this.confirmTaskCreat$ = this.confirmTaskBtnClick$.pipe(
            filter(_ => this.taskCreationForm.valid),
            withLatestFrom(this.taskCreationForm.valueChanges),
            switchMap(([_, formValues]) => {
                return this.facadeManager.createNewTask(formValues as TaskForm)
            })
        )

        this.executors$ = this.facadeManager.Users;
        this.priorityList$ = this.facadeManager.Priority;
        this.statusList$ = this.facadeManager.Status
        this.tasks$ = this.facadeManager.getTasks();

        this.initializedSideEffects();
    }

    initializedSideEffects(): void {
        this.creatTaskBtnClick$.pipe(
            takeUntil(this.destroy$)
        ).subscribe(() => {
           this.dialogRef = this.dialog.open(this.createTaskTemplateRef, {
                width: '650px'
            })
        })

        this.confirmTaskCreat$.pipe(
            withLatestFrom(of(this.taskCreationForm))
        ).subscribe(([response, form]) => {
            this.dialogRef.close()
            this.showAlertAndResetForm(response, form)
        })

        this.deleteTaskBtn$.pipe(
            takeUntil(this.destroy$)
        ).subscribe(id => {
            this.facadeManager.deleteTask(id)
        })
    }

    private showAlertAndResetForm(response: TaskForm, formGroup: FormGroup): void {
        if (response) {
            this.snakeBar.open('Задача успешно создана');
            formGroup.reset();
            Object.keys(formGroup.controls).forEach(key => {
                formGroup.controls[key].setErrors(null)
            });
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }

}
