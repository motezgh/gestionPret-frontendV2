import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { host } from '../domain/domain';
import { Notification } from "../model/notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }

  getUserNotif(id):Observable<any>{
    return this.http.get<getResponseNotification>(host+"/notifications/search/notSeen?user="+id+"&sort=sentAt,desc")
    .pipe(map(response=>response._embedded.notifications))
  }

  getAllUserNotif(id):Observable<any>{
    return this.http.get<getResponseNotification>(host+"/notifications/search/all?user="+id)
    .pipe(map(response=>response._embedded.notifications))
  }

  seenNotif(id):Observable<any>{
    return this.http.get(host+"/seen/"+id);
  }

}

interface getResponseNotification{
  _embedded:{
    notifications:Notification[];
  }
}
