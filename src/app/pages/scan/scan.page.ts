import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import {ListService} from "../../services/list.service";
import {Observable} from "rxjs";
import {Token} from "../../models/token";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  scanActive = false;
  token: Observable<Token>;
  canRead : string[] = [];
  canWrite : string[] = [];

  constructor(public listService: ListService,
              public authenticationService: AuthenticationService,
              public router: Router) { }

  ngOnInit() {
  }
  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        await BarcodeScanner.openAppSettings();
        resolve(false);
      }
    });
  }

  async startScanner() {
    const allowed = await this.checkPermission();

    if (allowed) {
      this.scanActive = true;
      document.body.style.background = 'transparent';
      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        this.scanActive = false;
        this.stopScanner()
        this.authenticationService.getUser().subscribe(user=>{
          this.listService.getToken(result.content).subscribe(token => {
            this.listService.getOne(token.listId).pipe(first()).subscribe(list => {
              this.canRead = list.canRead;
              this.canWrite = list.canWrite;
              if(token.canWrite){
                this.canWrite.push(user.email)
              } else {
                this.canRead.push(user.email);
              }
              this.listService.updateList(token.listId, this.canRead, this.canWrite, list.name, user.email);
              this.listService.deleteQRCode(result.content);
              this.router.navigate(['list-details/'+token.listId])
            })
          })
        });
      }
    } else {
      alert("Merci d'autoriser l'accès à la camera dans vos paramètres afin de bénéficier de cette fonctionnalité.");
    }
  }

  stopScanner() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  ionViewWillLeave() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

}
