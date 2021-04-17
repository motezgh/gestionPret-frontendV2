import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationService } from 'src/app/services/notification.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Notification } from "src/app/model/notification";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notificationsNotSeen:Notification[];
  notificationsLength:number;
  id:number;

  constructor(private notifService:NotificationService,
    private tokenStorageService:TokenStorageService) { }

  ngOnInit(): void {
    this.getUser();
    this.getNotifOfUser();
  }

  getUser(){
    const helper = new JwtHelperService()
        const decodedToken = helper.decodeToken(this.tokenStorageService.getToken());
        this.id = decodedToken.id;
  }

  getNotifOfUser(){
    
        return this.notifService.getUserNotif(this.id).subscribe(
          resp=>{this.notificationsNotSeen=resp;this.notificationsLength=resp.length;console.log(resp);console.log(resp.length)},
          error=>{console.log(error)}
        );
  }

  seenNotif(notifId){
    return this.notifService.seenNotif(notifId).subscribe(
      resp=>{console.log("seen")},
      error=>{console.log("error"+error)}
    );
  }

}
