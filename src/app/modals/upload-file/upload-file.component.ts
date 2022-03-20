import { Component, OnInit } from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/compat/storage';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {finalize, tap} from 'rxjs/operators';
import {ModalController, NavParams} from '@ionic/angular';
import {deleteObject, ref} from '@angular/fire/storage';
import {Router} from '@angular/router';

export interface FILE {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  ngFireUploadTask: AngularFireUploadTask;
  progressNum: Observable<number>;
  progressSnapshot: Observable<any>;
  fileUploadedPath: Observable<string>;
  files: Observable<FILE[]>;
  FileName: string;
  FileSize: number;
  isImgUploading: boolean;
  isImgUploaded: boolean;
  private ngFirestoreCollection: AngularFirestoreCollection<FILE>;
  private fileStoragePath: string;
  private readonly userUid: string;

  constructor(
      private angularFirestore: AngularFirestore,
      private angularFireStorage: AngularFireStorage,
      public modalController: ModalController,
      private navParams: NavParams,
      private router: Router) {
    this.userUid = this.navParams.data.userUid;
    this.isImgUploading = false;
    this.isImgUploaded = false;
    this.ngFirestoreCollection = angularFirestore.collection<FILE>('filesCollection');
    this.files = this.ngFirestoreCollection.valueChanges();
  }

  ngOnInit() {}

  fileUpload(event: FileList) {

    const file = event.item(0)

    if (file.type.split('/')[0] !== 'image') {
      console.log('File type is not supported!')
      return;
    }

    this.isImgUploading = true;
    this.isImgUploaded = false;

    this.FileName = file.name;

    this.fileStoragePath = `${this.userUid}`;

    const imageRef = this.angularFireStorage.ref(this.fileStoragePath);

    this.ngFireUploadTask = this.angularFireStorage.upload(this.fileStoragePath, file);

    this.progressNum = this.ngFireUploadTask.percentageChanges();
    this.progressSnapshot = this.ngFireUploadTask.snapshotChanges().pipe(
      finalize(() => {
        this.fileUploadedPath = imageRef.getDownloadURL();
        this.fileUploadedPath.subscribe(resp=>{
          this.fileStorage({
            name: file.name,
            filepath: resp,
            size: this.FileSize
          });
          this.isImgUploading = false;
          this.isImgUploaded = true;
        },error => {
          console.log(error);
        })
      }),
      tap(snap => {
        this.FileSize = snap.totalBytes;
      })
    )
  }


  fileStorage(image: FILE) {
    const ImgId = this.angularFirestore.createId();

    this.ngFirestoreCollection.doc(ImgId).set(image).then(data => {
      console.log(data);
    }).catch(error => {
      console.log(error);
    });
  }

  async closeModal() {
    window.location.href = "/tabs/profil";
    await this.modalController.dismiss();
  }

  changePicture() {
    let imageRef = ref(this.angularFireStorage.storage, this.fileStoragePath);
    deleteObject(imageRef).catch(e => console.log(e));
    this.isImgUploading = false;
    this.isImgUploaded = false;
  }

  undo() {
    this.closeModal().then(() => this.changePicture());
  }
}
