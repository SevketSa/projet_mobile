import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ListService} from "../../services/list.service";
import {Todo} from "../../models/todo";
import {List} from "../../models/list";

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {
  private id : number = -1;
  public list : List;
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
    this.list = this.listService.getOne(this.id);
  }

  delete(todo : Todo) {
    this.listService.deleteTodo(this.list, todo);
  }
}
