import { Component, OnInit } from '@angular/core';
import { Pret } from 'src/app/model/pret';
import { PretService } from 'src/app/services/pret.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-archive-prets-employe',
  templateUrl: './archive-prets-employe.component.html',
  styleUrls: ['./archive-prets-employe.component.scss']
})
export class ArchivePretsEmployeComponent implements OnInit {

  page=1;
  prets:Pret[];

  constructor(private pretService:PretService,
    private token:TokenStorageService) { }

  ngOnInit(): void {
    this.getPretsArchiver()
  }

  getPretsArchiver(){
    const user=this.token.getUser();
    this.pretService.getPretsArchiverOfUser(user.id)
    .subscribe(
      resp=>{this.prets=resp},
      error=>{}
    );
  }

}
