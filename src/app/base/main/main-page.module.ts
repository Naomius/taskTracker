import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageRoutingModule } from './main-page-routing.module';
import {MainPageComponent} from "./main-page.component";
import {SharedModule} from "../../shared/shared.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatInputModule} from "@angular/material/input";


@NgModule({
    declarations: [
        MainPageComponent,
    ],
    imports: [
        CommonModule,
        MainPageRoutingModule,
        SharedModule,
        MatTableModule,
        MatSortModule,
        MatInputModule,
        MatFormFieldModule,
    ]
})
export class MainPageModule {}
