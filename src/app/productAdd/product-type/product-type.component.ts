import { Component, OnInit } from '@angular/core';
import M from 'materialize-css';
import axios from 'axios';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css'],
})
export class ProductTypeComponent implements OnInit {
  product: {
    _id: number;
    name: string;
    description: string;
    created: string;
  }[] = [];
  products: any;
  constructor() {}

  ngOnInit(): void {
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, { inDuration: 300, outDuration: 225 });
    axios
      .get('http://localhost:3002/products')
      .then((res) => {
        this.product = res.data;
        this.products = this.product;
      })
      .catch((error) => {
        alert('internate');
        console.log(error);
      });
  }

  onSubmit(form: NgForm) {
    axios
      .post('http://localhost:3002/products/create', form.value)
      .then((res) => {
        M.toast({ html: 'Product add Success' });
        window.location.href = '/product';
      })
      .catch((error) => {
        alert('Internate error');
      });
  }
}
