interface IProduct {
    name: string;
    price: number;
}

interface IOrderItem {
    product: IProduct;
    quantity: number;
    getTotalPrice(): number;
}

interface IOrderItemFactory {
    createOrderItem(product: IProduct, quantity: number): IOrderItem;
}

interface IOrder {
    addItem(product: IProduct, quantity: number): void;
    getTotalOrderPrice(): number;
}

class Product implements IProduct {
    public name: string;
    public price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}

class OrderItem implements IOrderItem {
    public product: IProduct;
    public quantity: number;

    constructor(product: IProduct, quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }

    public getTotalPrice(): number {
        return this.product.price * this.quantity;
    }
}

class OrderItemFactory implements IOrderItemFactory {
    public createOrderItem(product: IProduct, quantity: number): IOrderItem {
        return new OrderItem(product, quantity);
    }
}

class Order implements IOrder {
    private items: IOrderItem[] = [];
    private orderItemFactory: IOrderItemFactory;

    constructor(orderItemFactory: IOrderItemFactory) {
        this.orderItemFactory = orderItemFactory;
    }

    public addItem(product: IProduct, quantity: number): void {
        const orderItem = this.orderItemFactory.createOrderItem(product, quantity);
        this.items.push(orderItem);
    }

    public getTotalOrderPrice(): number {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }
}

// use case
const orderItemFactory: IOrderItemFactory = new OrderItemFactory();
const order: IOrder = new Order(orderItemFactory);

const foo: IProduct = new Product('foo', 2);
const bar: IProduct = new Product('bar', 1.5);

order.addItem(foo, 3);
order.addItem(bar, 2);

console.log(`total order price: $${order.getTotalOrderPrice()}`);
