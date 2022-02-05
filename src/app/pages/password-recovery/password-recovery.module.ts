import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordRecoveryPageRoutingModule } from './password-recovery-routing.module';

import { PasswordRecoveryPage } from './password-recovery.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordRecoveryPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PasswordRecoveryPage],
})
export class PasswordRecoveryPageModule {}
