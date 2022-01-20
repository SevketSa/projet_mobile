export class Todo {
  name : String;
  description : String;
  isDone : boolean;

  constructor(name : String, description? : String, isDone? : boolean) {
    this.name = name;
    this.description = description ?? "";
    this.isDone = isDone ?? false;
  }
}
