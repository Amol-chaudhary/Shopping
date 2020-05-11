import { Component, OnInit } from '@angular/core';
import M from 'materialize-css';
import { NgForm } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, { inDuration: 300, outDuration: 225 });
  }
  onSubmit(form: NgForm) {
    if (form.value.password === form.value.confirm) {
      axios
        .post('http://localhost:3002/signup', form.value)
        .then((res) => {
          console.log(res.data);
          M.toast({ html: 'Register Success' });
          window.location.href = '/login';
        })
        .catch((error) => {
          alert('Internate error');
        });
    } else {
      alert('password are not match');
    }
  }
}
