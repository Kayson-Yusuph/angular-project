import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DropDownDirective } from './drop-down.directive';
import { ErrorPageComponent } from '../error-page/error-page.component';
import { LoaderComponent } from './loader/loader.component';
import { AlertComponent } from './alert/alert.component';
import { PlaceHolderDirective } from './placeholder.directive';
import { LoggingService } from '../services/logging.service';

@NgModule({
  declarations: [
    DropDownDirective,
    ErrorPageComponent,
    LoaderComponent,
    AlertComponent,
    PlaceHolderDirective,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    DropDownDirective,
    ErrorPageComponent,
    LoaderComponent,
    AlertComponent,
    PlaceHolderDirective,
    FormsModule,
    CommonModule,
  ],
  providers: [LoggingService],
})
export class SharedModule { }
