import { Component } from '@angular/core';
import {ListService} from "../services/list.service";
import {List} from "../models/list";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  lists: List[] = [];

  constructor(public listService : ListService) {}

  echo() {
    console.log("coucou");
  }

  ngOnInit() {
    this.listService.init();
    this.lists = this.listService.getAll();
  }

  delete(list : List) {
    this.listService.delete(list);
  }
}
