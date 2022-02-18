import { Component, OnInit } from '@angular/core';
import {ListService} from "../../services/list.service";
import {ActivatedRoute} from "@angular/router";
import {List} from "../../models/list";
import {Todo} from "../../models/todo";
import {Observable} from 'rxjs';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {
  public ntp : number = 3;
  public listId : number = +this.route.snapshot.paramMap.get("idL");
  public todoId : number = +this.route.snapshot.paramMap.get("idT");
  public myTodo: Observable<Todo>;
  public name?: String;
  public isDone?: boolean;
  public description?: String;

  constructor(public route: ActivatedRoute, public listService : ListService) { }

  ngOnInit() {
    let myList = this.listService.getOne(this.listId);
    this.myTodo = myList.collection('todos').doc<Todo>(this.todoId.toString()).valueChanges();
    this.myTodo.subscribe(value => {
      if(value !== null) {
        this.name = value.name;
        this.isDone = value.isDone;
        this.description = value.description;
      }
    })
  }



}
