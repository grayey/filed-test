import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { UserService } from '../services/user/user.service';
import { PaymentService } from '../services/payment/payment.service';
import { ApiHandlerService } from '../services/api-handler.service';

import { AppComponent } from './app.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { HomeComponent } from './home/home.component';

import { APP_ROUTES } from './app.routing';



@NgModule({
  declarations: [
    AppComponent,
    CreditCardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [
    UserService,
    PaymentService,
    ApiHandlerService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
