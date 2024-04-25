import { NgModule } from '@angular/core';
import {AppComponent} from "./app.component";
import {SharedModule} from "./shared/shared.module";
import {BaseModule} from "./base/base.module";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {BaseComponent} from "./base/base.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru'
registerLocaleData(localeRu);

@NgModule({
    declarations: [
        AppComponent,
        BaseComponent
    ],
    imports: [
        BrowserModule,
        BaseModule,
        SharedModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatSnackBarModule,
    ],
    providers: [
        provideAnimationsAsync(),
        {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
