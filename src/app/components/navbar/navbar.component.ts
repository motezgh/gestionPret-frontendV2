import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';

import { TokenStorageService } from 'src/app/services/token-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PretService } from 'src/app/services/pret.service';
import { StatService } from 'src/app/services/stat.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from 'src/app/model/notification';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public isCollapsed = true;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];

    isLoggedIn = false;
    private roles: string[];
    
    isResponsable = false;
    isEmploye = false;
    username: string;

    notify:number=1;
    prevLength:number;
    length:number;
    notificationsNotSeen: Notification[];
    notificationsLength: number;

    constructor(private tokenStorageService:TokenStorageService,
        private notifService:NotificationService,
        private stat:StatService,
        public location: Location,
        private router: Router) {
    }

    ngOnInit() {
        this.isLoggedIn = !!this.tokenStorageService.getUser();
    
    
        if (this.isLoggedIn) {
            const user=this.tokenStorageService.getUser();
            const helper = new JwtHelperService()
            const decodedToken = helper.decodeToken(this.tokenStorageService.getToken());
            this.roles = decodedToken.roles;
        
            this.isResponsable = this.roles.includes('RH');
            this.isEmploye = this.roles.includes('EMPLOYE');
        
            this.username = user.username;
        }

        this.notification();
        this.getNotifOfUser();
    }

    logout() {
        this.tokenStorageService.signOut();
        this.isLoggedIn=false;
        this.isResponsable=false;
        this.isEmploye=false;
        //window.location.reload();
        
    }


    notification(){
            return this.stat.getNumberOfPretsByEtat('ENCOURS')
            .subscribe(
              resp=>{this.notify=resp}
            )
    }

    
      getNotifOfUser(){
        const helper = new JwtHelperService()
            const decodedToken = helper.decodeToken(this.tokenStorageService.getToken());
            const id = decodedToken.id;
            return this.notifService.getUserNotif(id).subscribe(
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
