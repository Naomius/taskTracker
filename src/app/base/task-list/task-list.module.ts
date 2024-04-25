import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskListRoutingModule } from './task-list-routing.module';
import {TaskListComponent} from "./task-list.component";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../../shared/shared.module";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow, MatHeaderRowDef,
    MatRow, MatRowDef,
    MatTable, MatTableModule
} from "@angular/material/table";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatCardActions} from "@angular/material/card";


@NgModule({
  declarations: [TaskListComponent],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        SharedModule,
        MatInputModule,
        TaskListRoutingModule,
        MatTableModule,
        MatTable,
        MatSortModule,
        MatSort,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        MatHeaderRow,
        MatRow,
        MatCellDef,
        MatHeaderCellDef,
        MatHeaderRowDef,
        MatRowDef,
        MatCardActions,
    ]
})
export class TaskListModule { }
