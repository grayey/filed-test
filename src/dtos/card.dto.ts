export interface CreditCard{
  card_no:string;
  card_holder:string;
  expiry_date:string;
  security_code?:string;
  amount:number;
}
