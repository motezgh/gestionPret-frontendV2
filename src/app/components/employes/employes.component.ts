import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { host } from 'src/app/domain/domain';
import { AppUser } from 'src/app/model/app-user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.scss']
})
export class EmployesComponent implements OnInit {

  focus: any;
  focus1: any;

  users:AppUser[];
  host=host;
  page=1;

  term: string;

  nbrEmployes:number;
  searchMode: boolean;

  constructor(private userService:UserService,
    private activatedRoute:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    //this.handleListEmployes();
    this.activatedRoute.paramMap.subscribe(()=>{this.getAllUsers();})
  }

  getAllUsers() {
    this.searchMode=this.activatedRoute.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      //do search work
      this.handleSearchEmployes();
      
    }else {
      //display all users
      this.handleListEmployes();
    }
  }

  
  deletUser(id:number){
    let c=confirm("Etes vous sure ?");
    if(!c) return;
    this.userService.deleteUser(id)
    .subscribe(rep=>{
      console.log(rep);
      //window.location.reload();
      //this.getAllUsers();
      this.handleListEmployes();
    },err=>{
      console.log(err);
    });
  }

  handleListEmployes(){
    this.userService.getAllUsers()
    .subscribe((users)=>{
      this.users=users;this.nbrEmployes=users.length;
      console.log(users)
    },error=>{
      console.log(error);
    });
  }

  handleSearchEmployes(){
    const keyword:string =this.activatedRoute.snapshot.paramMap.get('keyword');
    
    this.userService.searchUser(keyword)
    .subscribe(
      resp=>{console.log('search000 '+resp); this.users=resp},
      error=>{console.log("error search"+error)}
    );
  }

}
