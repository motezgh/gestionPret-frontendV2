import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { host } from 'src/app/domain/domain';
import { Pret } from 'src/app/model/pret';
import { PretService } from 'src/app/services/pret.service';

@Component({
  selector: 'app-archiver-prets',
  templateUrl: './archiver-prets.component.html',
  styleUrls: ['./archiver-prets.component.scss']
})
export class ArchiverPretsComponent implements OnInit {
  prets: Pret[];
  pret:Pret;
  archiver=false;
  host=host;
  page=1;
  date= new Date();
  dateFinRemb: Date;
  
  term: string;

  constructor(private pretService:PretService,) { }

  ngOnInit(): void {
    this.getAllPrets();
    
  }

  getAllPrets(){
    return this.pretService.getAllPretsAarchiver()
    .subscribe(
      resp=>{this.prets=resp;for(let i=0;i<resp.length;i++){this.dateFinRemb=new Date(resp[i].finRemb)}},
      error=>{}
      );
  }

  archiverPret(id){
    this.pretService.archiverPret(id)
    .subscribe(
      resp=>{this.archiver=true},
      error=>{}
    );
  }

}
