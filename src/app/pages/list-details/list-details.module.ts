import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListDetailsPageRoutingModule } from './list-details-routing.module';

import { ListDetailsPage } from './list-details.page';
import { CreateTodoComponent } from '../../modals/create-todo/create-todo.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListDetailsPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
    declarations: [ListDetailsPage, CreateTodoComponent]
})
export class ListDetailsPageModule {}
