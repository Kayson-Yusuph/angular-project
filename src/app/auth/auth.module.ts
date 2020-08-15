import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { AuthEffects } from './store/auth.effects';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    SharedModule,
    // EffectsModule.forRoot([AuthEffects]),
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
  ],
  exports: [RouterModule],
})
export class AuthModule {}
