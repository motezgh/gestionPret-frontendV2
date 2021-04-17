import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppUser } from 'src/app/model/app-user';
import { EtypeName } from 'src/app/model/etype-name';
import { Pret } from 'src/app/model/pret';
import { PretService } from 'src/app/services/pret.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-create-pret',
  templateUrl: './create-pret.component.html',
  styleUrls: ['./create-pret.component.scss']
})
export class CreatePretComponent implements OnInit {

  focus1;focus2;focus3;
  pretForm:FormGroup;
  pret=new Pret();
  user:AppUser;

  submitted=false;

  typePrets=Object.keys(EtypeName);

  showErrorMessage=false;
  showSuccessMessage=false;
  errorMessagePret:string;

  constructor(private pretService:PretService,
    private tokenService:TokenStorageService,
    private userService:UserService,
    private fb:FormBuilder) { 
      this.createForm();
    }

  ngOnInit(): void {
  }

  createForm() {
    const currentUser=this.tokenService.getUser();
    // this.pretForm.patchValue({
    //   user_id:currentUser.id
    // })
  this.pretForm=this.fb.group({
    id:currentUser.id,
    duree:[null,[Validators.required,Validators.pattern(/^([1-9]\d*)?$/)]],
      montant:[null,[Validators.required,Validators.pattern(/^([1-9]\d*)?$/)]],
      typePret:['',Validators.required]

  });
  }

  get f() { return this.pretForm.controls; }

  onReset() {
    this.submitted = false;
    this.pretForm.reset();
  }

  demandePret(){
    this.showErrorMessage=false;
    this.showSuccessMessage=false;
    this.submitted=true
    if (this.pretForm.invalid){
      return;
    }
    this.pretService.createPret(this.pretForm.value)
    .subscribe(
      resp=>{this.pret=resp;console.log('pret cree' + resp);this.showSuccessMessage=true;this.onReset()},
      error=>{console.log(error);this.errorMessagePret='Vous pouvez pas créer ce pret ! Verifier les details ou bien votre capaciter de remboursement ou bien la fin de votre contrat';
      this.showErrorMessage=true}
    );
  }

}
