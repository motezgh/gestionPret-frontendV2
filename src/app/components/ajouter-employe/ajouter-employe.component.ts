import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppUser } from 'src/app/model/app-user';
import { Econtrat } from 'src/app/model/econtrat';
import { EDepartement } from 'src/app/model/edepartement';
import { EFonction } from 'src/app/model/efonction';
import { EmailService } from 'src/app/services/email.service';
import { UserService } from 'src/app/services/user.service';

import {NgbDateParserFormatter, NgbDateStruct, NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-ajouter-employe',
  templateUrl: './ajouter-employe.component.html',
  styleUrls: ['./ajouter-employe.component.scss']
})
export class AjouterEmployeComponent implements OnInit {

  focus1;focus2;focus3;focus4;focus5;focus6;focus7;focus8;focus9;


  errorMessageAdd:string;
  showErrorMessage=false;
  showSuccessMessage=false;
  emailSend:boolean;
  keys = Object.keys;
  contrats=Econtrat;
  departements = EDepartement;
  fonctions = EFonction;
  submitted= false;

  addUserForm: FormGroup;
  newUser:AppUser;

  model: NgbDateStruct;
  model2:NgbDateStruct;

  constructor(private userService:UserService,
    private fb: FormBuilder,
    private parserFormatter:NgbDateParserFormatter,
    private emailService:EmailService,
    public toastService: ToastService) { 
      this.createForm();
    }

  ngOnInit(): void {
    this.setContratTypeValidators()
  }

     // convenience getter for easy access to form fields
  get f() { return this.addUserForm.controls; }


  createForm(){
    this.addUserForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      email: ['', [Validators.required, Validators.email] ],
      password : ['', [Validators.required] ],
      salaire:[null, [Validators.required,Validators.pattern(/^([1-9]\d*)?$/)] ],
      fonction:['',[Validators.required]],
      departement:['',[Validators.required]],
      contratType:['',[Validators.required]],
      debutContrat:['', [Validators.required] ],
      finContrat: [null,Validators.required]
      
    });
  }

  setContratTypeValidators(){
    const finContratControl=this.addUserForm.get('finContrat');

    this.addUserForm.get('contratType').valueChanges
    .subscribe(
      contratType=>{
        if(contratType!=Econtrat.CDI){
          finContratControl.setValidators([Validators.required]);
        }
        if(contratType==Econtrat.CDI){
          finContratControl.setValidators(null);
        }
        finContratControl.updateValueAndValidity();
      }
      );
  }

  addUser(){
    this.submitted = true;
    this.emailSend=false;
    this.addUserForm.value.debutContrat=this.parserFormatter.format(this.model);
    this.addUserForm.value.finContrat=this.parserFormatter.format(this.model2);
    if (this.addUserForm.invalid){
      return;
    }
    this.userService.addUser(this.addUserForm.value)
    .subscribe(resp=>{
    this.newUser=resp;
    console.log("this is resp : "+ resp.id);
    this.emailService.sendCreatedAccountMessage(resp.id).subscribe(reponse=> this.emailSend=true);
    this.showErrorMessage=false;
    this.showSuccessMessage=true;
    
   // window.location.reload();
    this.onReset();
    
    },err=>{
      this.showErrorMessage=true;
      this.showSuccessMessage=false;
      this.errorMessageAdd=err.error.message;
      console.log(err);
    });
  }

  onReset() {
    this.submitted = false;
    this.addUserForm.reset();
  }

}
