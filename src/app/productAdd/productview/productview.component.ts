import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
import axios from 'axios';
import M from 'materialize-css';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-productview',
  templateUrl: './productview.component.html',
  styleUrls: ['./productview.component.css'],
})
export class ProductviewComponent implements OnInit {
  a: any;
  id: any;
  itemdata: any;
  reviewdata: any;
  commentdata: any;
  currentroute: any;
  data: any;
  image: any;
  routers: any;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.routers = sessionStorage.getItem('route');
    var b = sessionStorage.getItem('UserId');
    if (b != null) {
      this.data = 'dfvdf';
    } else {
      M.toast({ html: 'Please login' });
      this.router.navigate(['/login']);
    }
    this.currentroute = window.location.href;
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    axios.get('http://localhost:3002/items/' + this.id).then((res) => {
      this.itemdata = res.data;
      this.image = this.itemdata.imageData.split('\\');
      var data = `${this.image[4]}/${this.image[5]}`;
      this.image = 'assets/Images/' + data;
      console.log(this.itemdata);
      console.log(this.image);
      axios.get('http://localhost:3002/review/data/' + this.id).then((res) => {
        this.reviewdata = res.data;
        console.log(this.reviewdata);
      });
      axios.get('http://localhost:3002/comment/data/' + this.id).then((res) => {
        this.commentdata = res.data;
        console.log(this.commentdata);
      });
    });

    this.zoomOut();
  }

  imageZoom(imgID) {
    let img, lens, result, cx, cy;
    img = document.getElementById(imgID);
    result = document.getElementById('my-result');
    result.style.display = 'block';
    lens = document.querySelector('.img-zoom-lens');
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize =
      img.width * cx + 'px ' + img.height * cy + 'px';
    lens.addEventListener('mousemove', moveLens);
    img.addEventListener('mousemove', moveLens);
    lens.addEventListener('touchmove', moveLens);
    img.addEventListener('touchmove', moveLens);
    lens.addEventListener('mouseout', closemove);
    // img.addEventListener('mouseout', closemove);
    function moveLens(e) {
      let pos, x, y;
      e.preventDefault();
      pos = getCursorPos(e);
      x = pos.x - lens.offsetWidth / 2;
      y = pos.y - lens.offsetHeight / 2;
      if (x > img.width - lens.offsetWidth) {
        x = img.width - lens.offsetWidth;
      }
      if (x < 0) {
        x = 0;
      }
      if (y > img.height - lens.offsetHeight) {
        y = img.height - lens.offsetHeight;
      }
      if (y < 0) {
        y = 0;
      }
      lens.style.left = x + 'px';
      lens.style.top = y + 'px';
      result.style.backgroundPosition = '-' + x * cx + 'px -' + y * cy + 'px';
    }
    function closemove(e) {
      e.preventDefault();
      result = document.getElementById('my-result');
      result.style.display = 'none';
    }
    function getCursorPos(e) {
      let a,
        x = 0,
        y = 0;
      e = e || window.event;
      a = img.getBoundingClientRect();
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    }
  }
  zoomOut() {
    let out = document.getElementById('my-result');
    out.style.display = 'none';
  }
  Addquestion(event): void {
    var username = sessionStorage.getItem('userName');
    var values: object = {
      question: event,
      username: username,
      product: this.id,
    };
    axios
      .post('http://localhost:3002/comment/create/' + this.id, values)
      .then((res) => {
        M.toast({ html: 'Comment add Success' });
        document.getElementById('search').innerHTML = '';
        console.log(res.data);
        window.location.href = this.currentroute;
      });
  }
  AddCard() {
    var user = sessionStorage.getItem('UserId');
    var values: object = {
      user: user,
      product: this.id,
    };
    axios.post('http://localhost:3002/card/create', values).then((res) => {
      M.toast({ html: 'Add To card Success' });
      window.location.href = this.currentroute;
    });
  }
  Buy(name: string) {
    if (confirm('You really wants to buy')) {
      M.toast({ html: 'Thanks for purchase the product ' + name });
      this.router.navigate(['/home']);
    } else {
      M.toast({ html: 'Please choose another one' });
      this.routers = sessionStorage.getItem('route');
      window.location.href = this.routers;
    }
  }
  backpage() {
    this.routers = sessionStorage.getItem('route');
    window.location.href = this.routers;
  }
}
