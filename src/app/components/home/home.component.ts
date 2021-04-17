import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppUser } from 'src/app/model/app-user';
import { PretService } from 'src/app/services/pret.service';
import { StatService } from 'src/app/services/stat.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoggedIn = false;
  nbrEmployes: number;
  sumSalaire: number;
  nbrEmployesInfo: number;
  nbrEmployesGestion: number;
  nbrEmployesRH: number;
  nbrPretsAccepter: number;
  sumPrets:number;
  user: AppUser;
  roles: any;
  isResponsable: any;
  nbrPretsEnCours: number;

  constructor(private tokenStorageService:TokenStorageService,
    private stat :StatService,
    private userService:UserService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getUser();
    this.numberOfUsers();
    this.sumOfSalaire();
    this.numberOfUsersInfo();
    this.numberOfUsersGestion();
    this.numberOfUsersRH();
    this.numberOfPretsAccepte();
    this.sumPretsAccepte();
    this.numberOfPretsEnCours();

    const helper = new JwtHelperService()
    const decodedToken = helper.decodeToken(this.tokenStorageService.getToken());
    this.roles = decodedToken.roles;

    this.isResponsable = this.roles.includes('RH');

  }



  numberOfUsers(){
    return this.stat.getNumberOfUsers()
    .subscribe(
      resp=>{this.nbrEmployes=resp}
    )
  }

  sumOfSalaire(){
    return this.stat.getSumSalaire()
    .subscribe(
      resp=>{this.sumSalaire=resp}
    )
  }

  numberOfUsersInfo(){
    return this.stat.getNumberOfUsersByDepartement('INFORMATIQUE')
    .subscribe(
      resp=>{this.nbrEmployesInfo=resp}
    )
  }

  numberOfUsersGestion(){
    return this.stat.getNumberOfUsersByDepartement('GESTION')
    .subscribe(
      resp=>{this.nbrEmployesGestion=resp}
    )
  }

  numberOfUsersRH(){
    return this.stat.getNumberOfUsersByDepartement('RH')
    .subscribe(
      resp=>{this.nbrEmployesRH=resp}
    )
  }

  numberOfPretsAccepte(){
    return this.stat.getNumberOfPretsByEtat('ACCEPTER')
    .subscribe(
      resp=>{this.nbrPretsAccepter=resp}
    )
  }

  numberOfPretsEnCours(){
    return this.stat.getNumberOfPretsByEtat('ENCOURS')
    .subscribe(
      resp=>{this.nbrPretsEnCours=resp}
    )
  }

  sumPretsAccepte(){
    return this.stat.getSumOfPrets()
    .subscribe(
      resp=>{this.sumPrets=resp}
    )
  }

}
