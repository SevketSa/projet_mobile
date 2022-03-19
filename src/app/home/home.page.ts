import {Component} from '@angular/core';
import {ListService} from "../services/list.service";
import {List} from "../models/list";
import {ActivatedRoute, Router} from "@angular/router";
import {EMPTY, Observable} from "rxjs";
import {AuthenticationService} from '../services/authentication.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    lists: Observable<[List[], List[]]> = EMPTY;
    type: string[] = ["Write", "Read Only"];
    name: string = "List";

    constructor(public route: ActivatedRoute,
                public listService: ListService,
                private authenticationService: AuthenticationService,
                private router: Router) {
    }

    ngOnInit() {
        this.lists = this.listService.getAll();
    }

    delete(listId: number) {
        this.listService.delete(listId);
    }

    logout() {
        this.authenticationService.logout().catch((error) => {
            console.error("Probleme de deconnexion. "+error);
        });
        this.router.navigate(['/login']).catch((error) => {
            console.error("Probleme de redirection vers le /login. "+error);
        });
    }
}
