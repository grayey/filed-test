import { Action } from "@ngrx/store";
import { CreditCard } from "../../../dtos/card.dto";
import * as CreditCardActions from "../actions/card.actions";


const initialState: CreditCard  = {
  card_no:"XXXX",
  card_holder:"YYYY",
  expiry_date:new Date().toISOString(),
  security_code:"",
  amount:5
}

export function cardReducer(state: CreditCard[] = [initialState], action:CreditCardActions.Actions){

  switch(action.type){
    case CreditCardActions.ADD_CARD:
      return [action.payload, ...state];
      case CreditCardActions.REMOVE_CARD:
        const newState = [...state];
        newState.splice(action.payload,1);
        return newState;
    default:
      return state;
  }

}
