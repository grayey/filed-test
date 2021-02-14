import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../../services/payment/payment.service';
import { CreditCard } from '../../dtos/card.dto';
import * as CreditCardActions from "../state-manager/actions/card.actions";

import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

import { hasRequiredField, setValidationClass } from '../../utils/helpers';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  private static creditCardForm = () => {
    return {
      card_no: ['', Validators.compose([Validators.required])],
      card_holder: ['', Validators.compose([Validators.required])],
      expiry_date: ['', Validators.compose([Validators.required])],
      security_code: ['', Validators.compose([Validators.minLength(3),Validators.maxLength(3)])],
      amount: ['', Validators.compose([Validators.required])],
    };
  };

  public hasRequiredField = hasRequiredField;
  public setValidationClass = setValidationClass;
  public creditCardForm: FormGroup;

  public loaders = {
    processing:false
  }
  public btnText = {
    pay:'Pay'
  }
  public today = new Date().toISOString().split('T')[0];


  constructor(private router:Router, private fb:FormBuilder, private paymentService:PaymentService, private store:Store<AppState>) {
    this.creditCardForm = this.fb.group(CreditCardComponent.creditCardForm())
   }


  ngOnInit(): void {
  }

  /**
   * This method navigates back to home page
   */
  public goBack = (): void => {
    this.router.navigateByUrl('');
  }


  /**
   * This method makes a credit card payment
   */
  public makePayment = async ():Promise<any> => {
    const paymentData : CreditCard = this.creditCardForm.value;
    const { amount } = paymentData;
    if(!amount){
      return alert('Please provide a valid amount');
    }
    this.loaders.processing = true;
    this.btnText.pay = 'Processing..';
    return await this.paymentService.makePayment(paymentData).subscribe(
      (paymentResponse) => {
        // this.notification.error('An error ocuured', error);
        this.loaders.processing = false;
        this.btnText.pay = 'Pay';
        this.dispatchPayment(paymentData);
        this.creditCardForm.reset();

        console.log('Liste response', paymentResponse);
      },
      (error) => {
        // this.notification.error('An error ocuured', error);
        this.loaders.processing = false;
        this.btnText.pay = 'Pay';
        this.dispatchPayment(paymentData);
        this.creditCardForm.reset();
        console.log('An Error Occurred', error);
      }
    );
  }


  /**
   *
   * @param paymentData
   * This method dispatches a new payment to the store
   */
  public dispatchPayment = (paymentData:CreditCard) =>{
    this.store.dispatch(new CreditCardActions.AddCard(paymentData))

  }


}
