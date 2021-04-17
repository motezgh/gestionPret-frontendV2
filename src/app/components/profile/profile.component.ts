import { Component, OnInit } from '@angular/core';

import { AppUser } from 'src/app/model/app-user';
import { Pret } from 'src/app/model/pret';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';


import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PretService } from 'src/app/services/pret.service';
import { EtypeName } from 'src/app/model/etype-name';

import { host } from "src/app/domain/domain";
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import jwt_decode from "jwt-decode";
import { JwtHelperService } from "@auth0/angular-jwt";


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    focus1;focus2;focus3;focus4;focus5;

    user:AppUser;
    prets:Pret[];
    pret:Pret;

    isCDI=false;

    editUserForm:FormGroup;
    submittedPret=false;
    submitted=false;
    editPretForm:FormGroup;
    
    selectedFiles: any;
    progress: number;
    currentFileUpload: any;

    typePretNames=Object.keys(EtypeName);

    page:number=1;

    host=host;
    
    model: NgbDateStruct;

    constructor(private tokenStorageService:TokenStorageService,
        private userService:UserService,
        private pretService:PretService,
        private fb:FormBuilder,
        private modalService:NgbModal,
        private parserFormatter:NgbDateParserFormatter) { 
                this.createForm();
                this.createFormPret();
                
                
        }

    ngOnInit() {
        this.getUser();
        //this.getPretNonArchiverOfUser();
        //this.getPretOfUser();
    }

    getUser(){
        const user1 =this.tokenStorageService.getUser();

        const decode=jwt_decode(this.tokenStorageService.getToken())
        
        const helper = new JwtHelperService()
        const decodedToken = helper.decodeToken(this.tokenStorageService.getToken());
        const id = decodedToken.id;
        
        console.log(user1);
        this.userService.getUser(id)
        .subscribe(resp=>{
        
        this.user=resp;
        
        console.log(this.user.id + 'here');
        },err=>{
        console.log("error home get user")
        });
    }
    
    
    
    getPretNonArchiverOfUser(userId){
        //const currentUser =this.tokenStorageService.getUser();
        return this.pretService.getPretsNonArchiverOfUser(userId)
        .subscribe(
        resp=>{this.prets=resp}
        )
    }
    
    get f() { return this.editUserForm.controls; }
    
    get g() { return this.editPretForm.controls; }
    
    
    createForm(){
        this.editUserForm=this.fb.group(
        {
            nom:[''],
            prenom:[''],
            phone:['',[Validators.pattern(/^([1-9]\d*)?$/)]],
            adresse:[''],
            dateNaissance:['',[Validators.pattern(/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/\-]\d{4}$/)]]
        }
        );
    }
    
    openEdit(user:AppUser){
    
        this.editUserForm.patchValue(
        {
            nom:user.nom,
            prenom:user.prenom,
            phone:user.phone,
            adresse:user.adresse,
            dateNaissance:user.dateNaissance
        }
        );
    }
    
    
    
    editUser(id){
        //const currentUser =this.tokenStorageService.getUser();
        this.submitted = true;
        //this.editUserForm.value.dateNaissance=this.parserFormatter.format(this.editUserForm.value.dateNaissance);
        if(this.editUserForm.invalid){
        return;
        }
        console.log(this.editUserForm);
        return this.userService.editUser(id,this.editUserForm.value)
        .subscribe(
        resp=>{this.user=resp;location.reload()},
        error=>{console.log(error)}
        );
    }
    
    
    openEditPret(targetModal, pret:Pret ) {
        this.modalService.open(targetModal);
        this.editPretForm.patchValue({
        id:pret.user.id,
        duree:pret.dureeRemboursement,
        montant:pret.montant,
        typePret:pret.typePret.nameType
        });
    }
    
    createFormPret(){
        this.editPretForm=this.fb.group({
        id:'',
        duree:[null,Validators.required],
        montant:[null,Validators.required],
        typePret:['',Validators.required]
        });
    
    }
    
    
    
    updatePret(id){
        this.submittedPret=true
        this.pretService.updatePret(id,this.editPretForm.value)
        .subscribe(
            resp=>{console.log('pret modified' + resp)},
            error=>{console.log(error)}
        );
        this.modalService.dismissAll();
        location.reload();
        
    }
    
    deletePret(id){
        let c=confirm("Etes vous sure ?");
        if(!c) return;
        this.pretService.deletePret(id)
        .subscribe(
        resp=>{console.log('pret supprimer');},//this.getPretOfUser()
        error=>console.log(error)
        )
    }
    

    openModal(targetModal) {
        this.modalService.open(targetModal,{ centered: true });
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
        resp=>{alert("vous etes sur ?");this.modalService.dismissAll();
        location.reload();},
        error=>console.log(error)
        );
      }


}
