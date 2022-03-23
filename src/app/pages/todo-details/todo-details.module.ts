import { NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodoDetailsPageRoutingModule } from './todo-details-routing.module';

import { TodoDetailsPage } from './todo-details.page';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoDetailsPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [TodoDetailsPage]
})
export class TodoDetailsPageModule {}
