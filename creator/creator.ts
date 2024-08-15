interface IProduct {
    name: string;
    price: number;
}

interface IOrder {
    addProduct(name: string, price: number): void;
    getTotalPrice(): number;
    productList(): void;
}

class Product implements IProduct {
    public name: string;
    public price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}

class Order implements IOrder {
    private products: IProduct[] = [];

    public addProduct(name: string, price: number): void {
        const product = new Product(name, price);
        this.products.push(product);
    }

    public getTotalPrice(): number {
        const total = this.products.reduce((total, product) => total + product.price, 0);
        return total;
    }

    public productList(): void {
        console.log(`order contains:`);
        this.products.forEach(product => {
            console.log(`- ${product.name}: $${product.price}`);
        })
    }
}

// use case
const order: IOrder = new Order();
order.addProduct("foo", 1.5);
order.addProduct("bar", 2.0);

order.productList();
console.log(`total price: $${order.getTotalPrice()}`);

