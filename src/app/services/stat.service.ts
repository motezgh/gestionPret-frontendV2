import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { host } from '../domain/domain';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  constructor(private http:HttpClient) { }

  getNumberOfUsersByDepartement(departement:string){
    return this.http.get<number>(host+"/appUsers/search/count?departement="+departement);
  }
  getSumSalaire(){
    return this.http.get<number>(host+"/appUsers/search/sumSalaire");
  }
  getNumberOfUsers(){
    return this.http.get<number>(host+"/appUsers/search/sumUsers");
  }
  getNumberOfPretsByEtat(etat:string){
    return this.http.get<number>(host+"/prets/search/countPret?etat="+etat);
  }
  getSumOfPrets(){
    return this.http.get<number>(host+"/prets/search/sumPret");
  }

}
