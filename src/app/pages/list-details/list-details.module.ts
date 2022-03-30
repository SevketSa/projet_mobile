import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListDetailsPageRoutingModule } from './list-details-routing.module';

import { ListDetailsPage } from './list-details.page';
import { CreateTodoComponent } from '../../modals/create-todo/create-todo.component';
import { ReactiveFormsModule } from '@angular/forms';
import {ListDetailsListComponent} from "../../components/list-details-list/list-details-list.component";
import {ListDetailsGraphicComponent} from "../../components/list-details-graphic/list-details-graphic.component";
import {QRCodeModule} from "angularx-qrcode";
import {CreateQrcodeComponent} from "../../modals/create-qrcode/create-qrcode.component";
import {NgCalendarModule} from "ionic2-calendar";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ListDetailsPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    QRCodeModule,
    NgCalendarModule
  ],
  declarations: [ListDetailsPage, CreateTodoComponent, ListDetailsListComponent, ListDetailsGraphicComponent, CreateQrcodeComponent],
})
export class ListDetailsPageModule {}
