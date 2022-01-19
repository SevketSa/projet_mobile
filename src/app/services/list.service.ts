import { Injectable } from '@angular/core';
import {Todo} from "../models/todo";
import {List} from "../models/list";

@Injectable({
  providedIn: 'root'
})
export class ListService {
  lists : List[];

  constructor() { }

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
    const i = this.lists.indexOf(list);
    delete this.lists[i];
  }
}
