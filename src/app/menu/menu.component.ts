import { Component, OnInit, ViewChild } from '@angular/core';
import M from 'materialize-css';
import { NgForm } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  firstName: string;
  data: string;
  cardcount: any;
  currentroute: any;
  mobiles: any = [
    {
      type1: 'Mi',
      id: '5e9f3e72edaae52548b85ed8',
    },
    {
      type1: 'Moto',
      id: '5e9f3e72edaae52548b85ed8',
    },
    {
      type1: 'Lenovo',
      id: '5e9f3e72edaae52548b85ed8',
    },
    {
      type1: 'Micromax',
      id: '5e9f3e72edaae52548b85ed8',
    },
    {
      type1: 'Apple',
      id: '5e9f3e72edaae52548b85ed8',
    },
    {
      type1: 'Nokia',
      id: '5e9f3e72edaae52548b85ed8',
    },
  ];
  laptops: any = [
    {
      type1: 'Dell',
      id: '5e9f3e72edaae52548b85ed8',
    },
    {
      type1: 'HP',
      id: '5e9f3e72edaae52548b85ed8',
    },
    {
      type1: 'Lenovo',
      id: '5e9f3e72edaae52548b85ed8',
    },
    {
      type1: 'Apple',
      id: '5e9f3e72edaae52548b85ed8',
    },
    {
      type1: 'Assus',
      id: '5e9f3e72edaae52548b85ed8',
    },
  ];
  Tv: any = [
    {
      type1: 'smallsize',
      name: 'Small Size TV',
      id: '5e9f3e72edaae52548b85ed8',
    },
    {
      type1: 'mediumsize',
      name: 'medium Size TV',
      id: '5e9f3e72edaae52548b85ed8',
    },
    {
      type1: 'largesize',
      name: 'Large Size TV',
      id: '5e9f3e72edaae52548b85ed8',
    },
  ];
  Vegatables: any = [
    {
      type1: 'tamato',
      name: 'Green Tamato',
      id: '5e9f3e72edaae52548b85ed8',
    },
    {
      type1: 'tamato',
      name: 'medium Size TV',
      id: '5e9f3e72edaae52548b85ed8',
    },
    {
      type1: 'largesize',
      name: 'Large Size TV',
      id: '5e9f3e72edaae52548b85ed8',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentroute = window.location.href;
    var elem = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elem);
    let elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 });
    var ele = document.querySelectorAll('select');
    M.FormSelect.init(ele, { inDuration: 300, outDuration: 225 });
    let e = document.querySelectorAll('.dropdown-button');
    var el = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(el, { inDuration: 300, outDuration: 225 });
    M.Dropdown.init(e, {
      inDuration: 300,
      outDuration: 225,
      constrain_width: false,
      hover: true,
      gutter: 0,
      belowOrigin: false,
      alignment: 'left',
    });
    var id = sessionStorage.getItem('UserId');
    axios.get('http://localhost:3002/users/' + id).then((res) => {
      this.cardcount = res.data.card.length;
    });
    var a = sessionStorage.getItem('userName');
    if (a == null) {
      this.firstName = 'sign in';
      this.data = null;
    } else {
      this.firstName = a;
      this.data = 'sdncd';
    }
    var b = sessionStorage.getItem('access');
    console.log(b);
    if (b == null) {
      document.getElementById('access').style.display = 'none';
    } else if (b == 'view') {
      document.getElementById('access').style.display = 'none';
    } else {
      M.toast({ html: 'Welcome Admin' });
    }
  }

  openNav() {
    document.getElementById('mySidenav').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0px';
    document.getElementById('main').style.marginLeft = '0px';
    window.location.href = '';
  }
  Logout() {
    axios
      .get('http://localhost:3002/signout')
      .then(() => {
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('access');
        sessionStorage.removeItem('UserId');
        M.toast({ html: 'Logout Success' });
        window.location.href = '/home';
      })
      .catch((error) => {
        alert('Internate error');
      });
  }
  addProduct() {}
  onSearch(form: NgForm) {
    console.log(form.value);
    var id = '&&';
    var type = '//';
    var search = form.value.name;
    console.log(search);
    this.router.navigate(['/allproductview/', id, type, search]);
    this.currentroute = `http://localhost:4200/allproductview/&&/%2F%2F/${search}`;
    window.location.href = this.currentroute;
  }
}
