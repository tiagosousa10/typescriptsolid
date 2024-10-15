/*
Open/closed
Entidades devem estar abertas para extensao, mas fechadas para modificação
*/

import { Messaging } from './services/messaging';
import { Order } from './classes/order';
import { Persistency } from './services/persistency';
import { Product } from './classes/product';
import { ShoppingCart } from './classes/shopping-cart';
import { NoDiscount } from './classes/discount';

//                    MAIN
//const fiftyPercentDiscount = new FiftyPercentDiscount();
//const tenPercentDiscount = new TenPercentDiscount();
const noDiscount = new NoDiscount(); //injecao de dependencias
const shoppingCart = new ShoppingCart(noDiscount); //injecao de dependencias
const messaging = new Messaging(); //injecao de dependencias
const persistency = new Persistency(); //injecao de dependencias
const order = new Order(shoppingCart, messaging, persistency); //injecao de dependencias
shoppingCart.addItem(new Product('Camisola', 31.5));
shoppingCart.addItem(new Product('Lápis', 7.88));
shoppingCart.addItem(new Product('Borracha', 1.3));

//shoppingCart.clear();

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
console.log(order.orderStatus);
order.checkout();
console.log(order.orderStatus);
