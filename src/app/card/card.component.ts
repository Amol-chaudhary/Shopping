import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import M from 'materialize-css';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  userdata: any;
  carddata: any;
  productdata: any;
  allproduct: any;
  data: any = [];
  image: any;
  reloadpage: any;
  constructor() {}

  ngOnInit(): void {
    this.reloadpage = window.location.href;
    var id = sessionStorage.getItem('UserId');
    axios.get('http://localhost:3002/users/' + id).then((res) => {
      this.userdata = res.data.card;
      //console.log(this.userdata);
      for (var i = 0; i < this.userdata.length; i++) {
        axios
          .get('http://localhost:3002/card/' + this.userdata[i])
          .then((res) => {
            this.carddata = res.data.product;
            console.log(this.carddata);
            axios
              .get('http://localhost:3002/items/' + this.carddata)
              .then((res: any) => {
                this.data.push(res.data);
                for (var i = 0; i < this.data.length; i++) {
                  this.image = this.data[i].imageData.split('\\');
                  var data = `${this.image[4]}/${this.image[5]}`;
                  this.image = 'assets/Images/' + data;
                  this.data[i].imageData = this.image;
                }
              });
          });
      }
    });
    console.log(this.data);
  }
  deleteCard(id: any) {
    console.log(id);
    axios.delete('http://localhost:3002/card/' + id).then((res: any) => {
      M.toast({ html: 'remove Success' });
      window.location.href = this.reloadpage;
    });
  }
  Buy(name: string) {
    if (confirm('You really wants to buy')) {
      M.toast({ html: 'Thanks for purchase the product ' + name });
    } else {
      M.toast({ html: 'Please choose another one' });
    }
  }
}
