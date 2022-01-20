import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import {CreateListComponent} from "../modals/create-list/create-list.component";

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'create-list',
    component: CreateListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
