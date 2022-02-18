export class Todo {
  id : number;
  name : String;
  description : String;
  isDone : boolean;

  constructor(name : String, description? : String, isDone? : boolean, id?: number) {
    this.id = id ?? Math.floor(Math.random() *100) + Date.now()
    this.name = name;
    this.description = description ?? "";
    this.isDone = isDone ?? false;
  }
}
