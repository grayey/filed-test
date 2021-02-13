import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreditCardComponent } from './credit-card/credit-card.component';

export const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pay', component: CreditCardComponent },
];
