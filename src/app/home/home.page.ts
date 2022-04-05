import {Component} from '@angular/core';
import {ListService} from "../services/list.service";
import {List} from "../models/list";
import {ActivatedRoute} from "@angular/router";
import {EMPTY, Observable} from "rxjs";
import {Shake} from '@awesome-cordova-plugins/shake/ngx';
import {AlertController, Platform} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    allLists: Observable<[[List[]], List[][]]> = EMPTY;
    type: string[] = ["Mes listes","Partagées avec moi"];
    name: string = "List";
    isSorted: boolean = false;
    wait: boolean = false;

    constructor(public route: ActivatedRoute,
                public listService: ListService,
                private shake: Shake,
                private platform: Platform,
                public alertController: AlertController) {
    }

    ngOnInit() {
      this.allLists = this.listService.getAll();
      if(!this.platform.is('desktop')) {
          this.shake.startWatch().subscribe(() => {
              if(!this.wait) {
                  if (this.isSorted) {
                      this.allLists = this.listService.getAll();
                      this.wait = true;
                      this.presentAlert("Bouge ton tel", "La liste a été trié par défaut.")
                  } else {
                      this.allLists = this.listService.getAllSorted();
                      this.wait = true;
                      this.presentAlert("Bouge ton tel", "La liste a été trié par ordre alphabétique.")
                  }
                  this.isSorted = !this.isSorted;
              }
          });
      }
    }

    delete(listId: number) {
        this.listService.delete(listId);
    }

    async presentAlert(alertHeader: string, alertMessage: string) {
        const alert = await this.alertController.create({
            header: alertHeader,
            message: alertMessage,
            buttons: [{
                text:'OK',
                handler: () => {
                    this.wait = false;
                }
            }],
        });

        await alert.present();
        let result = await alert.onDidDismiss();
        if (result) {
            this.wait = false;
        }
    }
}
