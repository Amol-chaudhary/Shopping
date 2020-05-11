import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import M from 'materialize-css';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-allproductview',
  templateUrl: './allproductview.component.html',
  styleUrls: ['./allproductview.component.css'],
})
export class AllproductviewComponent implements OnInit {
  type: any;
  id: any;
  search: any;
  data1: any;
  currentroute: any;
  checkdata: any;
  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.checkdata = false;
    this.currentroute = window.location.href;
    sessionStorage.setItem('route', this.currentroute);
    this.type = this.route.snapshot.paramMap.get('type');
    this.id = this.route.snapshot.paramMap.get('id');
    this.search = this.route.snapshot.paramMap.get('search');
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
    if (this.type === null) {
      axios.get('http://localhost:3002/items/data/' + this.id).then((res) => {
        this.checkdata = true;
        this.data1 = res.data;
        if (this.data1[0] != null) {
          this.checkdata = 'dfvdfv';
        }
        for (var i = 0; i < this.data1.length; i++) {
          var image = this.data1[i].imageData.split('\\');
          var data = `${image[4]}/${image[5]}`;
          this.data1[i].imageData = 'assets/Images/' + data;
        }
      });
    } else if (this.search === null) {
      var data = `${this.id}/${this.type}`;
      axios.get('http://localhost:3002/items/data/' + data).then((res) => {
        this.data1 = res.data;
        if (this.data1[0] != null) {
          this.checkdata = 'dfvdfv';
        }
        for (var i = 0; i < this.data1.length; i++) {
          var image = this.data1[i].imageData.split('\\');
          var data = `${image[4]}/${image[5]}`;
          this.data1[i].imageData = 'assets/Images/' + data;
        }
      });
    } else {
      var datavalue: any = {
        name: this.search,
      };
      axios
        .post('http://localhost:3002/items/search', datavalue)
        .then((res) => {
          this.data1 = res.data;
          if (this.data1[0] != null) {
            this.checkdata = 'dfvdfv';
          }
          for (var i = 0; i < this.data1.length; i++) {
            var image = this.data1[i].imageData.split('\\');
            var data = `${image[4]}/${image[5]}`;
            this.data1[i].imageData = 'assets/Images/' + data;
          }
        });
    }
  }
}
