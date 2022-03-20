import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilPageRoutingModule } from './profil-routing.module';

import { ProfilPage } from './profil.page';
import {FileSizePipe} from '../../pipes/file-size.pipe';
import {UploadFileComponent} from '../../modals/upload-file/upload-file.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ProfilPage, FileSizePipe, UploadFileComponent]
})
export class ProfilPageModule {}
