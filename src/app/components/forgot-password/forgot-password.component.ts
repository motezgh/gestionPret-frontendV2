import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm:FormGroup;
  errorMsg: string;

  constructor(private modalService: NgbModal,
    private fb:FormBuilder,
    private authService:AuthService) { 
      this.createforgotForm();
    }

  ngOnInit(): void {
  }

  createforgotForm(){
    this.forgotForm=this.fb.group({
    email:['',Validators.required]
    });
  }


  openModal(targetModal) {
    this.modalService.open(targetModal,{ centered: true });
  }

  envoyer(){
    this.authService.forgotPassword(this.forgotForm.value)
    .subscribe(
      resp=>{console.log("resp "+resp)},
      error=>{console.log(error); this.errorMsg=error.error.text}
    );
  }

}
