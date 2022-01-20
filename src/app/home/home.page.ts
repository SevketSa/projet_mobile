import { Component } from '@angular/core';
import {ListService} from "../services/list.service";
import {Todo} from "../models/todo";
import {List} from "../models/list";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public listService : ListService) {}

  echo() {
    console.log("coucou");
  }

  delete(list : List) {
    return;
  }
}
