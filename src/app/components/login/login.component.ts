import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from  '@angular/router';
import { AppUser } from 'src/app/model/app-user';
import { AuthService } from "src/app/services/auth.service";
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  focus;
  focus1;

  user:AppUser=new AppUser();
  
  loginForm: FormGroup;
  loading =false;
  submitted = false;
  returnUrl: string;
  error = '';
  
  isLoggedIn = false;
  isLoginFailed = false;

  constructor(private formBuilder:FormBuilder,
    private route:ActivatedRoute,
    private authService:AuthService ,
    private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()){
      this.router.navigateByUrl("/profil");
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading=true;
         // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.loading=false;
        return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        console.log(data)
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.user.roles = this.tokenStorage.getUser().roles;
        this.user.id=this.tokenStorage.getUser().id;
        this.router.navigate(['/profil']);
        window.location.reload();
        this.loading=false;
      },
      err => {
        console.log('erreur '+err.message);
        this.error = "error :  Nom d'utilisateur ou mot de passe incorrect";
        
        this.isLoginFailed = true;
        this.loading = false;
      }
    );
  }

}
