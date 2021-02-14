import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../../services/payment/payment.service';
import { NotificationService } from '../../services/notifications.service';
import { CreditCard } from '../../dtos/card.dto';
import * as CreditCardActions from '../state-manager/actions/card.actions';

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
      security_code: ['', Validators.compose([Validators.minLength(3),Validators.maxLength(3), Validators.pattern(/^[0-9]\d*$/)])],
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


  constructor(private router:Router, private fb:FormBuilder, private paymentService:PaymentService,
     private store:Store<AppState>, private notification:NotificationService) {
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
    const { amount, expiry_date } = paymentData;
    if(!amount) return this.notification.error('Please provide a valid amount!');
    if(new Date(this.today) > new Date(expiry_date)) return this.notification.error('Card already expired!');

    this.loaders.processing = true;
    this.btnText.pay = 'Processing..';
    return await this.paymentService.makePayment(paymentData).subscribe(
      (paymentResponse) => {
        this.notification.success(paymentResponse.msg || 'Payment successful.');
        this.loaders.processing = false;
        this.btnText.pay = 'Pay';
        this.dispatchPayment(paymentData);
        this.creditCardForm.reset();
      },
      (error) => {
        this.loaders.processing = false;
        this.btnText.pay = 'Pay';
        console.log('An Error Occurred', error);
        error = null; // for demo purposes
        this.notification.error('An error occurred but data was dispatched.', error);
        // for demo purposes
        this.dispatchPayment(paymentData);
        this.creditCardForm.reset();
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
