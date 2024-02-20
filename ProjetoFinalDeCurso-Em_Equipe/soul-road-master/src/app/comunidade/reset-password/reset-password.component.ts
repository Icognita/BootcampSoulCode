import { AuthenticationService } from '../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, NgForm, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  email: FormControl;

    constructor(private authenticationService: AuthenticationService, private router: Router) {
        this.email = new FormControl("", [
            Validators.required,
            Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"),
        ]);
    }

    public resetPassword() {
        try {
          console.log("foi")
          console.log(this.email.value)
            return this.authenticationService.resetPassword(this.email.value);
        
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }
} 
 /*  private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService */
/*  async onSubmit(): Promise<void> {
    if (this.resetPasswordForm.valid) {
      this.isValidForm = true;
      const email = this.resetPasswordForm.get('email')?.value;
      try {
        await this.authenticationService.resetPassword(email);
        alert(`um email foi enviado para ${email}`)
      } catch (error) {
        this.isValidForm = true;
        alert(`eu nao sei o que tava escrito ${error}`)
      }
    }
  } */
  /*  resetPasswordForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  get email(): AbstractControl | null {
    return this.resetPasswordForm.get('email');
  }
 */