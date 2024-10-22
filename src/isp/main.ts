/*
Interface segregation principle
Os clientes nao devem ser forçados a depender de interfaces,type ou membros abstratos que nao utilizam
*/

import { Messaging } from './services/messaging';
import { Order } from './classes/order';
import { Persistency } from './services/persistency';
import { Product } from './classes/product';
import { ShoppingCart } from './classes/shopping-cart';
import { NoDiscount } from './classes/discount';
import { EnterpriseCustomer, IndividualCustomer } from './classes/customer';

//                    MAIN
//const fiftyPercentDiscount = new FiftyPercentDiscount();
//const tenPercentDiscount = new TenPercentDiscount();
const noDiscount = new NoDiscount(); //injecao de dependencias
const shoppingCart = new ShoppingCart(noDiscount); //injecao de dependencias
const messaging = new Messaging(); //injecao de dependencias
const persistency = new Persistency(); //injecao de dependencias
const individualCustomer = new IndividualCustomer(
  'Tiago',
  'Sousa',
  '111.111.111-11',
);
const enterpriseCustomer = new EnterpriseCustomer('Coca-Cola', '22222222222');
const order = new Order(
  shoppingCart,
  messaging,
  persistency,
  individualCustomer,
); //injecao de dependencias

shoppingCart.addItem(new Product('Camisola', 31.5));
shoppingCart.addItem(new Product('Lápis', 7.88));
shoppingCart.addItem(new Product('Borracha', 1.3));

//shoppingCart.clear();

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
console.log(order.orderStatus);
order.checkout();
console.log(individualCustomer);
console.log('EnterpriseCustomer: ', enterpriseCustomer);
console.log(order.orderStatus);
