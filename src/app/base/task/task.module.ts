import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../../shared/shared.module";
import {TaskComponent} from "./task.component";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {FormsModule} from "@angular/forms";
import {MatMenu, MatMenuItem, MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [TaskComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        SharedModule,
        TaskRoutingModule,
        MatCardHeader,
        MatCardActions,
        MatCard,
        MatCardContent,
        MatCardModule,
        MatChipsModule,
        FormsModule,
        MatMenu,
        MatMenuItem,
        MatMenuModule,
        MatButtonModule,
    ]
})
export class TaskModule { }
