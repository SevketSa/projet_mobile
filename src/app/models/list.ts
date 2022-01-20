import {Todo} from "./todo";

export class List {
  name : String;
  todos : Todo[];

  constructor(name : String, todos : Todo[]) {
    this.name = name;
    this.todos = todos;
  }
}
