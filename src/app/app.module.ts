import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { ProductTypeComponent } from './productAdd/product-type/product-type.component';
import { ProductComponent } from './productAdd/product/product.component';
import { AddproductComponent } from './productAdd/addproduct/addproduct.component';
import { ProductinfoComponent } from './productAdd/productinfo/productinfo.component';
import { ProductviewComponent } from './productAdd/productview/productview.component';
import { CardComponent } from './card/card.component';
import { AllproductviewComponent } from './productAdd/allproductview/allproductview.component';
import { ProfileComponent } from './profile/profile.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    DashboardComponent,
    FooterComponent,
    ProductTypeComponent,
    ProductComponent,
    AddproductComponent,
    ProductinfoComponent,
    ProductviewComponent,
    CardComponent,
    AllproductviewComponent,
    ProfileComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    NgxSpinnerModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
