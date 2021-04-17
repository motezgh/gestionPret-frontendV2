import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AppUser } from 'src/app/model/app-user';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {



  user:AppUser;
  usernameForm:FormGroup;
  showErrorMessageUsername=false;
  showSuccessMessageUsername=false;
  errorMessageUsername:string;
  showErrorMessagePassword=false;
  showSuccessMessagePassword=false;

  
  selectedFiles: any;
  progress: number;
  currentFileUpload: any;
  passwordForm:FormGroup;



  constructor(private tokenStorageService:TokenStorageService,
    private userService:UserService,
    private fb:FormBuilder,
    private modalService: NgbModal) { 
      this.createdUsernameForm();
      this.createPasswordForm();
    }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    const user1 =this.tokenStorageService.getUser();
    
    console.log(user1);
    this.userService.getUser(user1.id )
    .subscribe(resp=>{
    
      this.user=resp;
      
      console.log(this.user.id + 'here');
    },err=>{
      console.log("error home get user")
    });
  }

  createdUsernameForm() {
    this.usernameForm=this.fb.group({
      username:''
      //['',Validators.required,Validators.minLength(5),Validators.maxLength(15)]
    });
  }

  updateUsername(id){
    let c=confirm("Vous devez reconnecter, Etes vous sûr ? ");
    if(!c) return;
    if(this.usernameForm.invalid){
      return;
    }
    this.userService.updateUsername(id,this.usernameForm.value)
    .subscribe(
      resp=>{console.log('username updated' +resp);this.modalService.dismissAll();
      location.reload();this.showSuccessMessageUsername=true;this.tokenStorageService.signOut()},
      error=>{console.log('error update username'+error);this.showErrorMessageUsername=true;this.errorMessageUsername="Nom d'utilisateur existe!"}
    );
    
  }

  openModal(targetModal) {
    this.modalService.open(targetModal,{ centered: true });
  }

  createPasswordForm(){
    this.passwordForm=this.fb.group({
    oldPass:['',Validators.required],
    newPass:['',Validators.required]
    });
  }




  updatePassword(id){
    if(this.passwordForm.invalid){
    return;
    }
    this.userService.updatePassword(id,this.passwordForm.value)
    .subscribe(
    resp=>{console.log('password updated '+resp);this.modalService.dismissAll();
    location.reload();this.showSuccessMessagePassword=true},
    error=>{console.log('update password error '+error);this.showErrorMessagePassword=true}
    );
    
  }



  onSelectedFile(event){
    this.selectedFiles=event.target.files;
  }

  uploadPhoto(id){
    this.progress=0;
    this.currentFileUpload=this.selectedFiles.item(0);
    this.userService.uploadUserPhoto(this.currentFileUpload,id)
    .subscribe(
    event=>{if(event.type===HttpEventType.UploadProgress){
        this.progress=Math.round(100*event.loaded/event.total);
        console.log(this.progress)
    }else if (event instanceof HttpResponse){
      this.modalService.dismissAll();
      location.reload();
    }},
    error=>{alert("Problème de téléchargement...")}
    );
  }

  onDeletePhoto(id){
    this.userService.deleteUserPhoto(id)
    .subscribe(
    resp=>{alert("Vous étes sûr ?");this.modalService.dismissAll();
    location.reload();},
    error=>console.log(error)
    );
  }

}
