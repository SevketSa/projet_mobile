import {formatDate} from '@angular/common';

export class Notifications {
    id : number;
    message : string;
    isRead : boolean;
    created : string;
    userMail : string;

    constructor(message: string, userMail: string, isRead?: boolean, id?: number) {
        this.id = id ?? Math.floor(Math.random() * 100) + Date.now();
        this.userMail = userMail;
        this.message = message;
        this.isRead = isRead ?? false;
        this.created = formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ss', 'en');
    }
}
