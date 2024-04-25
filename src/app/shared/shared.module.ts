import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {MatCard, MatCardContent} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
      PageNotFoundComponent
  ],
    imports: [
        CommonModule,
        MatCard,
        MatCardContent,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        RouterLink,
    ],
    exports: [
        CommonModule,
        MatCard,
        MatCardContent,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
    ]
})
export class SharedModule { }
