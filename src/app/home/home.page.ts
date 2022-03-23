import {Component} from '@angular/core';
import {ListService} from "../services/list.service";
import {List} from "../models/list";
import {ActivatedRoute} from "@angular/router";
import {EMPTY, Observable} from "rxjs";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    lists: Observable<[[List[]], List[][]]> = EMPTY;
    type: string[] = ["Mes listes","Partagées avec moi"];
    name: string = "List";

    constructor(public route: ActivatedRoute,
                public listService: ListService) {
    }

    ngOnInit() {
        this.lists = this.listService.getAll();
    }

    delete(listId: number) {
        this.listService.delete(listId);
    }
}
