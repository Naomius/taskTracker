import {BehaviorSubject} from "rxjs";
import {Priority, Status, TaskPriority, TaskStatus, User} from "../../base/main/interfaces/task";

export const users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([
    {id: '1', name: 'Иван Иванов'},
    {id: '2', name: 'Петр Петров'},
    {id: '3', name: 'Мария Сидорова'},
    {id: '4', name: 'Екатерина Васильева'},
    {id: '5', name: 'Алексей Николаев'}
]);

export const priority$: BehaviorSubject<Priority[]> = new BehaviorSubject<Priority[]>([
    {value: TaskPriority.Low, priority: 'Низкий'},
    {value: TaskPriority.Medium, priority: 'Средний'},
    {value: TaskPriority.High, priority: 'Высокий'}
])

export const status$: BehaviorSubject<Status[]> = new BehaviorSubject<Status[]>([
    { value: TaskStatus.New, status: 'Новая' },
    { value: TaskStatus.InProgress, status: 'В процессе' },
    { value: TaskStatus.Done, status: 'Выполнена' },
]);
