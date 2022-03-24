import { Component, OnInit } from '@angular/core';
import {ListService} from '../../services/list.service';
import {AuthenticationService} from '../../services/authentication.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  private notifications: Observable<string[]>;

  constructor(public listService: ListService,
              public authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.getUser().subscribe(user => {
      this.notifications = this.listService.getNotifications(user.uid);
    })
  }

  delete(notif : string) {
    this.authenticationService.getUser().subscribe(user => {
      this.listService.deleteNotifications(notif);
    })
  }
}
