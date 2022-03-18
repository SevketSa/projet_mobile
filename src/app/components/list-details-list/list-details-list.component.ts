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

  constructor() {}

  ngOnInit() {}
}
