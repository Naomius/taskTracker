import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {BaseComponent} from "./base/base.component";
import {PageNotFoundComponent} from "./shared/components/page-not-found/page-not-found.component";

const routes: Routes = [
    {
        path: '',
        component: BaseComponent,
        children: [
            {
                path: '',
                redirectTo: '/main',
                pathMatch: 'full'
            },
            {
                path: '',
                loadChildren:() => import('./base/main/main-page.module').then(m => m.MainPageModule)
            },
            {
                path: '',
                loadChildren:() => import('./base/task/task.module').then(m => m.TaskModule)
            },
            {
                path: '',
                loadChildren:() => import('./base/task-list/task-list.module').then(m => m.TaskListModule)
            },
            {
                path: '**',
                component: PageNotFoundComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
