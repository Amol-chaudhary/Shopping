import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import M from 'materialize-css';
import axios from 'axios';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
})
export class AddproductComponent implements OnInit {
  filesToUpload: any;
  id: any;
  productid: any;
  multerImage: any;
  reloadpage: any;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.reloadpage = window.location.href;
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, { inDuration: 300, outDuration: 225 });
    var elem = document.querySelectorAll('select');
    M.FormSelect.init(elem, { inDuration: 300, outDuration: 225 });
    this.id = sessionStorage.getItem('productId');
    console.log(this.id);
  }

  onSubmit(form: NgForm) {
    axios
      .post('http://localhost:3002/items/create/' + this.id, form.value)
      .then((res) => {
        console.log(res.data);
        this.productid = res.data.items._id;
        sessionStorage.setItem('Imageid', res.data.items._id);

        console.log(this.productid);
        M.toast({ html: 'Product add Success' });
      })
      .catch((error) => {
        alert('Internate error');
      });
  }
  uploadImage(event: any) {
    let imageFormObj = new FormData();
    imageFormObj.append('imageName', 'multer-image-' + Date.now());
    imageFormObj.append('imageData', event.target.files[0]);
    this.multerImage = URL.createObjectURL(event.target.files[0]);
    console.log(event.target.files[0].name);
    this.productid = sessionStorage.getItem('Imageid');
    console.log(this.productid);
    axios
      .post(
        'http://localhost:3002/image/uploadmulter/' + this.productid,
        imageFormObj
      )
      .then((data) => {
        if (data.data.success) {
          console.log(data.data);
          alert('data add success');
          var a = sessionStorage.getItem('backpage');
          window.location.href = a;
        }
      })
      .catch((err) => {
        alert('Error while uploading image using multer');
      });
  }
  onReview(form: NgForm) {
    this.productid = sessionStorage.getItem('Imageid');
    var a = sessionStorage.getItem('userName');
    form.value.username = a;
    axios
      .post('http://localhost:3002/review/create/' + this.productid, form.value)
      .then((res) => {
        console.log(res.data);
        console.log(this.productid);
        M.toast({ html: 'Review add Success' });
      })
      .catch((error) => {
        alert('Internate error');
      });
  }
  onComment(form: NgForm) {
    this.productid = sessionStorage.getItem('Imageid');
    var a = sessionStorage.getItem('userName');
    form.value.username = a;
    axios
      .post(
        'http://localhost:3002/comment/create/' + this.productid,
        form.value
      )
      .then((res) => {
        M.toast({ html: 'Comment add Success' });
      })
      .catch((error) => {
        alert('Internate error');
      });
  }
}
