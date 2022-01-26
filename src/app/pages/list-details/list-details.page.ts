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
  public list : List;
  public listId : number = +this.route.snapshot.paramMap.get("id");

  constructor(public route: ActivatedRoute, public listService : ListService) { }

  ngOnInit() {
    this.list = this.listService.getOne(this.listId);
  }

  delete(todoId : number) {
    this.listService.deleteTodo(this.listId, todoId);
  }
}
