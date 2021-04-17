import { Component, OnInit } from '@angular/core';
import { host } from 'src/app/domain/domain';
import { AppUser } from 'src/app/model/app-user';
import { Pret } from 'src/app/model/pret';
import { TypePret } from 'src/app/model/type-pret';
import { PretService } from 'src/app/services/pret.service';

@Component({
  selector: 'app-prets',
  templateUrl: './prets.component.html',
  styleUrls: ['./prets.component.scss']
})
export class PretsComponent implements OnInit {
  prets: Pret[];
  pret:Pret;
  user:AppUser;
  typePret:TypePret;

  page=1;

  host=host;

  term: string;

  constructor(private pretService:PretService) { }

  ngOnInit(): void {
    this.getAllPrets();
  }

  getAllPrets(){
    this.pretService.getAllPretsNotArchiver()
    .subscribe(
      resp=>{this.prets=resp;console.log(resp.length)},
      error=>{}
      );
  }

  getPretEncours(){
    return this.pretService.getPretEnCours()
    .subscribe(
      resp=>{this.prets=resp;console.log("pret encours "+resp[0].id)},
      error=>{}
      );
  }

}
