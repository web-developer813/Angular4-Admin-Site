import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { AuthService } from '../../_services';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  model: any = {
    email: ''
  };
  message = '';
  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.form = this.fb.group ( {
      email: [ null, Validators.compose( [ Validators.required, CustomValidators.email ] ) ]
    } );
  }

  onSubmit() {
    this.authService.forgotPassword(this.model.email).subscribe(response => {
      this.message = response.message;
      // this.router.navigate ( ['/session/signin'] );
    });
  }

  clearMessage() {
    this.message = '';
  }
}
