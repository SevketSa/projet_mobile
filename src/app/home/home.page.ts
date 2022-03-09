import {Component} from '@angular/core';
import {ListService} from "../services/list.service";
import {List} from "../models/list";
import {CreateTodoComponent} from "../modals/create-todo/create-todo.component";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalController} from "@ionic/angular";
import {CreateListComponent} from "../modals/create-list/create-list.component";
import {EMPTY, Observable} from "rxjs";
import {AuthenticationService} from '../services/authentication.service';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    lists: Observable<[List[], List[]]> = EMPTY;
    type: String[] = ["Write", "Read Only"];

    constructor(public route: ActivatedRoute,
                public listService: ListService,
                private authenticationService: AuthenticationService,
                public modalController: ModalController,
                private router: Router) {
    }

    ngOnInit() {
        this.lists = this.listService.getAll();
    }

    delete(listId: number) {
        this.listService.delete(listId);
    }

    async openModal() {
        const modal = await this.modalController.create({
            component: CreateListComponent
        });

        modal.onDidDismiss().then(() => {
        });

        return await modal.present();
    }

    logout() {
        this.authenticationService.logout().catch((error) => {
            console.error("Probleme de deconnexion");
        });
        this.router.navigate(['/login']).catch((error) => {
            console.error("Probleme de redirection vers le /login");
        });
        ;
    }
}
