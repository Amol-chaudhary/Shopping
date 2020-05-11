import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './productAdd/product/product.component';
import { ProductTypeComponent } from './productAdd/product-type/product-type.component';
import { AddproductComponent } from './productAdd/addproduct/addproduct.component';
import { ProductviewComponent } from './productAdd/productview/productview.component';
import { CardComponent } from './card/card.component';
import { AllproductviewComponent } from './productAdd/allproductview/allproductview.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: DashboardComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'product',
    component: ProductTypeComponent,
  },
  {
    path: 'products/:id',
    component: ProductComponent,
  },
  {
    path: 'addproduct',
    component: AddproductComponent,
  },
  {
    path: 'productview/:id',
    component: ProductviewComponent,
  },
  {
    path: 'card',
    component: CardComponent,
  },
  {
    path: 'allproductview/:id/:type',
    component: AllproductviewComponent,
  },
  {
    path: 'allproductview/:id',
    component: AllproductviewComponent,
  },
  {
    path: 'allproductview/:id/:type/:search',
    component: AllproductviewComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
