import { Component, OnInit } from '@angular/core';
import M from 'materialize-css';
import axios from 'axios';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  users: [];
  data: any;
  id: any;
  type: any;
  allid: any = [];
  dashboardone: any = [
    {
      img: 'assets/Images/cloth/158780841524271xnxlsfqOL._AC_UL320_-w2822.jpeg',

      type: 'Protein Supplement',
      type1: 'Protein_Suppliment',
      id: '5eb961535cfc5d18541eb07f',
    },
    {
      img:
        'assets/Images/cloth/158780877211741o6YcCrRFL._SL500_SS120_-w2823.jpeg',
      type: 'Cooking & Banking Essentials',
      type1: 'Cooking_&_Banking_Essentials',
      id: '5eb961535cfc5d18541eb07f',
    },
    {
      img:
        'assets/Images/cloth/15878095991729e36759d-0400-41a0-aa2a-fb2bf8a2a132._SR150,300_-w2825.jpeg',
      type: 'Breakfask Essentials',
      type1: 'Breakfask_Essentials',
      id: '5eb961535cfc5d18541eb07f',
    },
  ];
  dashboardtwo: any = [
    {
      img:
        'assets/Images/Grooming & Hygiene/158921166784861s061xCF2L._AC_UL320_-w2898.jpeg',
      type: 'Masks',
      type1: 'Masks',
      id: '5eb971825cfc5d18541eb08f',
    },
    {
      img:
        'assets/Images/Grooming & Hygiene/158921182441981lYJjI7OXL._AC_UL320_-w2900.jpeg',
      type: 'Personal Hygiene',
      type1: 'Personal_Hygiene',
      id: '5eb971825cfc5d18541eb08f',
    },
    {
      img:
        'assets/Images/Grooming & Hygiene/158921195210441A9eQKTJGL._AC_UL320_-w2901.jpeg',
      type: 'Bath & Oral Care',
      type1: 'Bath_&_Oral_Care',
      id: '5eb971825cfc5d18541eb08f',
    },
  ];
  dashboardthree: any = [
    {
      img:
        'assets/Images/Baby Care Essentials/158921214066351G2qKhag4L._AC_UL320_-w2902.jpeg',
      type: 'Health & Safety',
      type1: 'Health_&_Safety',
      id: '5eb973825cfc5d18541eb099',
    },
    {
      img:
        'assets/Images/Baby Care Essentials/158921226482691Hpid6QDwL._AC_UL320_-w2903.jpeg',
      type: 'Diapers',
      type1: 'Diapers',
      id: '5eb973825cfc5d18541eb099',
    },
    {
      img:
        'assets/Images//Baby Care Essentials/158921238784271GS474iHuL._AC_UL320_-w2904.jpeg',
      type: 'Baby Bath & Grooming',
      type1: 'Baby_Bath_&_Grooming',
      id: '5eb973825cfc5d18541eb099',
    },
  ];
  dashboardfour: any = [
    {
      img:
        'assets/Images/Home Cleaning & Pet Supplies/158921252643781OAeZ3zPrL._AC_UL320_-w2905.jpeg',
      type: 'Detergents',
      type1: 'Detergents',
      id: '5eb9751f5cfc5d18541eb0a3',
    },
    {
      img:
        'assets/Images/Home Cleaning & Pet Supplies/158921264935581CTyMkYGXL._AC_UL320_-w2906.jpeg',
      type: 'Kichen Cleaners & Scrub Pads',
      type1: 'Kichen_Cleaners_&_Scrub Pads',
      id: '5eb9751f5cfc5d18541eb0a3',
    },
    {
      img:
        'assets/Images/Home Cleaning & Pet Supplies/158921275438871p4yRwcxRL._AC_UL320_-w2907.jpeg',
      type: 'Mop Sets',
      type1: 'Mop_Sets',
      id: '5eb9751f5cfc5d18541eb0a3',
    },
  ];
  constructor() {}

  ngOnInit(): void {
    const big = document.querySelector('.carousel-slider');
    M.Carousel.init(big, { indicators: true, autoplay: true });
    axios.get('http://localhost:3002/users').then((res) => {
      this.users = res.data;
      console.log(this.users);
      this.id = '123456789';
      this.type = 'cloth';
    });
  }
}
// https://romstage.com/miracle-box-2-82-crack-download/
// https://userupload.net/bjkqeopfa753
