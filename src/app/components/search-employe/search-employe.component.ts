import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-employe',
  templateUrl: './search-employe.component.html',
  styleUrls: ['./search-employe.component.scss']
})
export class SearchEmployeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  searchUser(keyword:string){
    console.log('keyword'+keyword);
    this.router.navigateByUrl('/search/' + keyword);
  }

}
