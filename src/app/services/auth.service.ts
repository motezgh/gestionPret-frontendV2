import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { host } from "../domain/domain";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  islogin = false ;

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    this.islogin=true;
    return this.http.post(host + '/login', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  forgotPassword(email):Observable<any>{
    return this.http.post(host+"/forgotPassword",email,httpOptions);
  }

  verifierToken(token:string):Observable<any>{
    return this.http.get(host+"/forgotPassword/"+token);
  }

  resetPassword(form):Observable<any>{
    return this.http.put(host+"/forgotPassword",{token:form.token,newPass:form.newPass},httpOptions);
  }

}
