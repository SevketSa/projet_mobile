import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ListService} from "../../services/list.service";
import {Todo} from "../../models/todo";

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {
  public id : number = -1;
  public name : String = this.route.snapshot.paramMap.get("name");

  constructor(public route: ActivatedRoute, public listService : ListService) { }

  ngOnInit() {
    let counter = 0;
    this.listService.getAll().forEach( (n,t) => {
      if (n.name == this.name) {
        this.id = counter;
      }
      counter++;
    })
  }

  delete(listName : String, todo : Todo) {
    this.listService.deleteTodo(listName, todo);
  }
}
