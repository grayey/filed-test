import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { CreditCard } from "../../../dtos/card.dto";

export const ADD_CARD = '[CREDIT_CARD] Add';
export const REMOVE_CARD = '[CREDIT_CARD] Remove';

export class AddCard implements Action {
  readonly type = ADD_CARD;

  constructor(public payload:CreditCard){}
}


export class RemoveCard implements Action {
  readonly type = REMOVE_CARD;

  constructor(public payload){}
}




export type Actions = AddCard|RemoveCard;
