import { Injectable } from '@angular/core';
import {List} from "../models/list";
import {Todo} from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class ListService {
  lists : List[] = [];

  constructor() { }

  public init() {
    this.lists.push(new List("List 1", [new Todo("Todo 1")]));
    this.lists.push(new List("List 2", [new Todo("Todo 1"), new Todo("Todo 2")]));
    this.lists.push(new List("List 3", [new Todo("Todo 1")]));
  }

  public getAll() : List[] {
    return this.lists;
  }

  public getOne(id : number) {
    return this.lists[id];
  }

  public create(list : List) {
    this.lists.push(list);
  }

  public delete(list : List) {
    const index = this.lists.indexOf(list, 0);
    if (index > -1) {
      this.lists.splice(index, 1);
    }
  }

  public deleteTodo(listName : String, todo : Todo) {
    let counter = 0;
    let i;
    this.lists.forEach( (n,t) => {
      if (n.name == listName) {
        i = counter;
      }
      counter++;
    })
    const index = this.lists[i].todos.indexOf(todo, 0);
    if (index > -1) {
      this.lists[i].todos.splice(index, 1);
    }
  }
}
