import { Component, OnInit } from '@angular/core';
import { host } from 'src/app/domain/domain';
import { AppUser } from 'src/app/model/app-user';
import { Pret } from 'src/app/model/pret';
import { TypePret } from 'src/app/model/type-pret';
import { PretService } from 'src/app/services/pret.service';

@Component({
  selector: 'app-prets-archiver',
  templateUrl: './prets-archiver.component.html',
  styleUrls: ['./prets-archiver.component.scss']
})
export class PretsArchiverComponent implements OnInit {

  prets:Pret[];
  pret:Pret;
  user:AppUser;
  typePret:TypePret;

  page:number=1;
  host=host;


  constructor(private pretService:PretService) { }

  ngOnInit(): void {
    this.getAllPrets();
  }

  getAllPrets(){
    return this.pretService.getAllPretsIsArchiver()
    .subscribe(
      resp=>{this.prets=resp},
      error=>{}
      );
  }



}
