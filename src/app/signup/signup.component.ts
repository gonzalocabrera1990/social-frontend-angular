import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  @ViewChild('cform') signupFormDirective;
  signupResponse: any;
  loading: boolean = false;
  expreg = /^(\w{3,})@(gmail|hotmail|outlook).\b(com|info|web)\b/;

  formErrors = {
    'email': '',
    'password': '',
    'confirmpassword': '',
    'gender': '',
    'date': '',
    'country': ''
  };

  validationMessages = {
    'email': {
      'required':      'Email is required.',
      'pattern':         'Email not in valid format.'
    },
    'password': {
      'required':      'A password is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'confirmpassword': {
      'required':      'A password is required.',
      'pattern':     'First Name must be at least 2 characters long.'
    },
    'gender': {
      'required':      'Gender number is required.'
    },
    'date': {
      'required':      'Date is required.',
      'email':         'Email not in valid format.'
    },
    'country': {
      'required':      'Country is required.'
    },
  };
  constructor(private fb: FormBuilder,
    @Inject('countries') private countries,
    private authService: AuthService,
    private readonly location: Location ) { }

  ngOnInit() {
    this.createForm();
  }
  
  createForm() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.expreg)] ],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(300)]],
      confirmpassword: ['', Validators.required],
      gender: ['', Validators.required],
      date: ['', Validators.required],
      country: ['', Validators.required]
    },{validator: this.checkIfMatchingPasswords('password', 'confirmpassword')});
    this.signupForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }
  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        this.formErrors['confirmpassword'] = "passwords are not equals"
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
        this.formErrors['confirmpassword'] = ""

          return passwordConfirmationInput.setErrors(null);
      }
    }
  }
  onSubmit() {
    this.loading = true
    this.authService.signUp(this.signupForm.value)
    .subscribe(resp =>{
      this.signupResponse = resp
      this.loading = false
    })
    this.signupFormDirective.resetForm();
    this.signupForm.reset({
      comment: ''
    });
  }
  onValueChanged(data?: any) {
    
    if (!this.signupForm) { return; }
    const form = this.signupForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
    goBack(){
    this.location.back();
  }
}
