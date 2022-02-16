import { Component, OnInit } from '@angular/core';
import {ListService} from "../../services/list.service";
import {ActivatedRoute} from "@angular/router";
import {List} from "../../models/list";
import {Todo} from "../../models/todo";

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {
  public ntp : number = 3;
  public listId : number = +this.route.snapshot.paramMap.get("idL");
  public todoId : number = +this.route.snapshot.paramMap.get("idT");
  public myTodo: Todo;

  constructor(public route: ActivatedRoute, public listService : ListService) { }

  ngOnInit() {
    let myList = this.listService.getOne(this.listId)
    //this.myTodo = myList.todos[this.todoId]
  }



}
