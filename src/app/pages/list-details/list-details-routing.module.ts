import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListDetailsPage } from './list-details.page';
import {CreateTodoComponent} from "../../modals/create-todo/create-todo.component";

const routes: Routes = [
  {
    path: '',
    component: ListDetailsPage
  },
  {
    path: 'create-todo',
    component: CreateTodoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListDetailsPageRoutingModule {}
