import {Component, OnInit, Renderer2} from '@angular/core';
import {ListService} from '../../services/list.service';
import {AuthenticationService} from '../../services/authentication.service';
import {EMPTY, Observable} from 'rxjs';
import {Notifications} from '../../models/notifications';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  private notifications: Observable<Notifications[]> = EMPTY;
  isRead: boolean;

  constructor(public listService: ListService,
              public authenticationService: AuthenticationService,
              private renderer: Renderer2) { }

  ngOnInit() {
    this.authenticationService.getUser().subscribe(user => {
      this.notifications = this.listService.getNotifications(user.email);
    })
  }

  delete(notifId: number) {
    this.listService.deleteNotifications(notifId);
  }

  readNotif(notifId: number) {
    this.listService.notificationRead(notifId);
  }
}
