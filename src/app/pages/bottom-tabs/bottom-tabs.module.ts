import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BottomTabsPageRoutingModule } from './bottom-tabs-routing.module';

import { BottomTabsPage } from './bottom-tabs.page';
import {CreateListComponent} from '../../modals/create-list/create-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BottomTabsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BottomTabsPage, CreateListComponent]
})
export class BottomTabsPageModule {}
