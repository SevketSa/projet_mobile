import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {Shake} from '@awesome-cordova-plugins/shake/ngx';


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        HomePageRoutingModule,
    ],
    declarations: [HomePage],
    providers: [Shake]
})
export class HomePageModule {}
