import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {TaskListService} from "./services/task-list.service";
import {TaskListServiceToken} from "./tokens/TaskListServiceToken";
import {BehaviorSubject, catchError, combineLatest, EMPTY, map, Observable, startWith, Subject, tap} from "rxjs";
import {Task} from "../main/interfaces/task";
import {Sort} from "@angular/material/sort";
import {formatDate} from "@angular/common";
import {TaskHelper} from "../../shared/helpers/tasksFacadeHelper";

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.scss',
    providers: [
        TaskListService,
        {
            provide: TaskListServiceToken,
            useExisting: TaskListService
        }
    ]
})
export class TaskListComponent implements OnInit {
    @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;
    displayedColumns: string[] = ['position', 'title', 'deadline', 'priority', 'status', 'assignees', 'description'];

    realTasks$!: Observable<Task[]>;
    tasks$!: Observable<Task[]>;
    filteredAndSortedTasks$!: Observable<Task[]>;

    filterTasks$: Subject<string> = new Subject<string>();
    sortBooks$: Subject<Sort> = new Subject<Sort>();
    error$: Subject<string> = new Subject<string>();
    isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(@Inject(TaskListServiceToken) private facadeTaskList: TaskListService) {

    }

    ngOnInit(): void {
        this.realTasks$ = this.facadeTaskList.getTasks();

        this.tasks$ = this.facadeTaskList.getTasks().pipe(
            tap(task => this.isLoading$.next(true)),
            startWith([]),
            catchError(err => {
                this.error$.next(err);
                return EMPTY
            }),
            tap(_ => this.isLoading$.next(false))
        );


        this.filteredAndSortedTasks$ = combineLatest([
            this.realTasks$,
            this.filterTasks$.pipe(startWith('')),
            this.sortBooks$.pipe(startWith({active: 'created', direction: 'asc'}))
        ]).pipe(
            map(([tasks, filterValue, sort]) => {
                let filteredTasks: Task[] = [...tasks];

                if (filterValue) {
                    const lowerCaseFilterValue = filterValue.toLowerCase();
                    filteredTasks = filteredTasks.filter(task => {
                        const statusMatches = task.status.status.toLowerCase().includes(lowerCaseFilterValue);
                        const assigneesMatches = task.assignees?.name.toLowerCase().includes(lowerCaseFilterValue);
                        const deadlineMatches = task.deadline
                            ? formatDate(task.deadline, 'longDate', 'ru-RU').toLowerCase().includes(lowerCaseFilterValue.trim())
                            : false;

                        return statusMatches || assigneesMatches || deadlineMatches;
                    });
                }

                filteredTasks = TaskHelper.sortTasks(filteredTasks, sort);

                return filteredTasks;
            })
        );
    }

    public cleanSearchInput(): void {
        this.filterTasks$.next('');
        this.filterInput.nativeElement.value = '';
    }

}

