import { OrderStatus } from './interfaces/order-status';
import { CustomerOrder } from './interfaces/customer-protocol';
import { ShoppingCartProtocol } from './interfaces/shooping-cart-protocol';
import { MessagingProtocol } from './interfaces/messaging.protocol';
import { PersistencyProtocol } from './interfaces/persistency-protocol';

export class Order {
  //alto nivel
  private _orderStatus: OrderStatus = 'open';

  constructor(
    private readonly cart: ShoppingCartProtocol, //ex. baixo nivel
    private readonly messaging: MessagingProtocol,
    private readonly persistency: PersistencyProtocol,
    private readonly customer: CustomerOrder,
  ) {}

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }
  checkout(): void {
    if (this.cart.isEmpty()) {
      console.log('O carrinho está VAZIO!');
      return;
    }
    this._orderStatus = 'closed';
    this.messaging.sendMessage(
      `O pedido foi recebido com um total de ${this.cart.totalWithDiscount()}`,
    );
    this.persistency.saveOrder();
    this.cart.clear();

    console.log('o cliente é', this.customer.getName(), this.customer.getIDN());
  }
}
