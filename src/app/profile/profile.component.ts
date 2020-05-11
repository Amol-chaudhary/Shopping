import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  data: any;
  constructor() {}

  ngOnInit(): void {
    var id = sessionStorage.getItem('UserId');
    axios
      .get('http://localhost:3002/users/' + id)
      .then((res) => {
        console.log(res.data);
        this.data = res.data;
      })
      .catch((error) => {
        alert('error');
      });
  }
}
