import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { CreditCard } from '../dtos/card.dto';
import * as CreditCardActions from "./state-manager/actions/card.actions";

import { AppState } from './app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  cardData: Observable<CreditCard[]>;
  lastCard:CreditCard

  title = 'FiledPay';

  constructor(private store:Store<AppState>){
    this.cardData = this.store.select('creditCard');
    this.cardData.subscribe(
      (cards)=>{
        this.lastCard = cards[0]
    },
    (error)=>{
      console.error(error);
    },
    ()=>{
      console.log('Complete')

    })
  }

  ngOnInit():void {

  }

  /**
   * This method deletes a card payment
   */
  public deleteCard = (index):void => {
    this.store.dispatch(new CreditCardActions.RemoveCard(index))
  }


}
