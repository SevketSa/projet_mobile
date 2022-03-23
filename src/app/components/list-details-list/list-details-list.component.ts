import {Component, Input, OnInit} from '@angular/core';
import {Todo} from "../../models/todo";

@Component({
  selector: 'app-list-details-list',
  templateUrl: './list-details-list.component.html',
  styleUrls: ['./list-details-list.component.scss'],
})
export class ListDetailsListComponent implements OnInit {
  @Input() delete: Function;
  @Input() todos: Todo[];
  @Input() listId: number;
  @Input() canWrite: boolean;

  constructor() {}

  ngOnInit() {}

  whichColor(todo : Todo) {
    if(!todo.isDone && todo.start != "") {
      let delta = (new Date(todo.end).getTime() - new Date(todo.start).getTime())/3;//Interval
      let res = (new Date().getTime() - new Date(todo.start).getTime());
      if(res <= delta*2) {
        return "warning";
      } else if (res > delta *2) {
        return "danger";
      }
    } else if (todo.isDone) {
      return "success";
    }
  }
}
