import { Component, createPlatformFactory, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  error:string;
  focus;
  resetForm:FormGroup;
  submitted=false;

  constructor(private activeRoute: ActivatedRoute,
    private router:Router,
    private authService:AuthService,
    private fb :FormBuilder) { 
      this.creatForm();
    }

  ngOnInit(): void {
    this.verifierToken();
  }


  verifierToken(){
    const token=this.activeRoute.snapshot.queryParamMap.get('token');
    return this.authService.verifierToken(token)
    .subscribe(
      resp=>{console.log(resp)},
      error=>{console.log(error)}
    );
  }
  creatForm(){
    const token=this.activeRoute.snapshot.queryParamMap.get('token');
    this.resetForm = this.fb.group({
      token:token,
      newPass: ['', Validators.required]
  });
  }

  get f() { return this.resetForm.controls; }
  
  resetPassword(){
    this.authService.resetPassword(this.resetForm.value)
    .subscribe(
      resp=>{console.log(resp);this.router.navigateByUrl('login')},
      error=>{console.log(error);this.error=error.error.text}
    );
  }

}
