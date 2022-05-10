import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  @ViewChild('cform') settingsFormDirective;
  loading: boolean;
  status: boolean = true
  formErrors = {
    'firstname': '',
    'lastname': '',
    'phrase': ''
  };

  validationMessages = {
    'firstname': {
      'maxlength':     'FirstName cannot be more than 30 characters long.'
    },
    'lastname': {
      'maxlength':     'Lastname cannot be more than 30 characters long.'
    },
    'phrase': {
      'maxlength':     'Phrase cannot be more than 100 characters long.'    }
  };

  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }
  
  createForm() {
    this.settingsForm = this.fb.group({
      firstname: ['', Validators.maxLength(30)],
      lastname: ['', Validators.maxLength(30)],
      phrase: ['', Validators.maxLength(100)],
      status: ''
    }, { validator:this.atLeastOneValidator()});
    this.settingsForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  private atLeastOneValidator = () => {
    return (settingsForm) => {
        let controls = settingsForm.controls;
        if ( controls ) {
            let theOne = Object.keys(controls).find(key=> controls[key].value!=='');
            if ( !theOne ) {
                return {
                    atLeastOneRequired : {
                        text : 'At least one should be selected'
                    }
                }
            }
        }
        return null;
    };
};

  onValueChanged(data?: any) {
    if (!this.settingsForm) { return; }
    const form = this.settingsForm;
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
  onSubmit() {
    this.loading = true
    this.userService.settingsUsers(this.settingsForm.value)
    .subscribe(resp =>{
      this.loading = false;
      this.router.navigate(['/userpage']);
    })
    this.settingsFormDirective.resetForm();
    this.settingsForm.reset({
      comment: ''
    });
  }
}
