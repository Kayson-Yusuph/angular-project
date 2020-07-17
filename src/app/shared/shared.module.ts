import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownDirective } from './dropdown.directive';
import { ErrorPageComponent } from '../error-page/error-page.component';
import { LoaderComponent } from './loader/loader.component';
import { AlertComponent } from './alert/alert.component';
import { PlaceHolderDirective } from './placeholder.directive';

@NgModule({
    declarations: [
        DropdownDirective,
        ErrorPageComponent,
        LoaderComponent,
        AlertComponent,
        PlaceHolderDirective
    ],
    imports: [CommonModule],
    exports: [
        DropdownDirective,
        ErrorPageComponent,
        LoaderComponent,
        AlertComponent,
        PlaceHolderDirective,
        CommonModule
    ]
})
export class SharedModule { }
