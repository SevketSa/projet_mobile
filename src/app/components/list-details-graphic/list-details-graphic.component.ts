import {Component, Input, OnInit} from '@angular/core';
import {Todo} from "../../models/todo";

@Component({
  selector: 'app-list-details-graphic',
  templateUrl: './list-details-graphic.component.html',
  styleUrls: ['./list-details-graphic.component.scss'],
})
export class ListDetailsGraphicComponent implements OnInit {
  @Input() delete: Function;
  @Input() todos: Todo[];
  @Input() listId: number;

  constructor() { }

  ngOnInit() {}

}
