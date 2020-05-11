import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import axios from 'axios';
import { CanActivate } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

declare var M: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {}
  onSubmit(form: NgForm) {
    console.log(form.value);
    this.spinner.show();
    axios
      .post('http://localhost:3002/signin', form.value)
      .then((res) => {
        this.spinner.hide();
        console.log(res.data);
        sessionStorage.setItem('access', res.data.user.access_role);
        sessionStorage.setItem('UserId', res.data.user._id);
        sessionStorage.setItem('userName', res.data.user.first);
        M.toast({ html: 'Login Success' });
        window.location.href = '/home';
      })
      .catch((error) => {
        alert('error');
      });
  }
}
