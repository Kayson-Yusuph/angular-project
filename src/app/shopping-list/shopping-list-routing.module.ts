import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';

const routes: Routes = [
    {
        path: 'shopping-list', component: ShoppingListComponent, children: [
            { path: ':id/edit', component: ShoppingListEditComponent },
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ShoppingListRoutingModule { }
