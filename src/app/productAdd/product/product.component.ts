import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import M from 'materialize-css';
import axios from 'axios';
import { error } from 'protractor';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: any;
  id: any;
  reloadpage: any;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.reloadpage = window.location.href;
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    sessionStorage.setItem('productId', this.id);
    axios.get('http://localhost:3002/products/' + this.id).then((res) => {});
    axios
      .get('http://localhost:3002/items/data/' + this.id)
      .then((res) => {
        this.products = res.data;
        for (var i = 0; i < this.products.length; i++) {
          var image = this.products[i].imageData.split('\\');
          var data = `${image[4]}/${image[5]}`;
          this.products[i].imageData = 'assets/Images/' + data;
          console.log(this.products);
        }
      })
      .catch((error) => {
        alert('Problem');
      });
  }
  deletedata(id: any) {
    axios
      .delete('http://localhost:3002/items/' + id)
      .then((res) => {
        console.log(res.data);
        M.toast({ html: 'Product Delete Success' });
        window.location.href = this.reloadpage;
        sessionStorage.setItem('backpage', this.reloadpage);
      })
      .catch((error) => {
        alert('Internate error');
      });
  }
}
