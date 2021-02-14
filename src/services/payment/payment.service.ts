import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';
import { CreditCard } from '../../dtos/card.dto';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentService{

  constructor(private apiHandler:ApiHandlerService) {

  }


  /**
   *
   * @param paymentData
   * This method makes a credit card payment
   */
  public makePayment =  (paymentData:CreditCard): Observable<any> => {
    const url = 'credit-card-pay';
    return  this.apiHandler.post(url, paymentData);
  }




}
