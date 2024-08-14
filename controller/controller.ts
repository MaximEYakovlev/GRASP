interface IProduct {
    id: number;
    name: string;
    price: number;
}

interface IOrder {
    id: number;
    customerName: string;
    addProduct(product: IProduct): void;
    getTotalPrice(): number;
    getProducts(): IProduct[];
}

interface IOrderFactory {
    createOrder(customerName: string): IOrder;
}

interface IOrderService {
    createOrder(customerName: string): IOrder;
    getOrderById(orderId: number): IOrder | undefined;
    addProductToOrder(orderId: number, product: IProduct): void;
}

interface IProductRepository {
    getProductById(productId: number): IProduct | undefined;
}

interface IOrderController {
    createOrder(customerName: string): IOrder;
    addProductToOrder(orderId: number, productId: number): void;
    getOrderTotalPrice(orderId: number): number;
}

class Product implements IProduct {
    public id: number;
    public name: string;
    public price: number;

    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class Order implements IOrder {
    private products: IProduct[] = [];
    public id: number;
    public customerName: string;

    constructor(id: number, customerName: string) {
        this.id = id;
        this.customerName = customerName;
    }

    public addProduct(product: IProduct) {
        this.products.push(product);
    }

    public getTotalPrice(): number {
        return this.products.reduce((total, product) => total + product.price, 0);
    }

    public getProducts(): IProduct[] {
        return this.products;
    }
}

class OrderFactory implements IOrderFactory {
    private orderId: number = 0;

    public createOrder(customerName: string): IOrder {
        if (!customerName) {
            throw new Error('customer name cannot be empty');
        }

        this.orderId++;

        return new Order(this.orderId, customerName);
    }
}

class OrderService implements IOrderService {
    private orders: IOrder[] = [];
    private orderFactory: IOrderFactory;

    constructor(orderFactory: IOrderFactory) {
        this.orderFactory = orderFactory;
    }

    public createOrder(customerName: string): IOrder {
        const newOrder = this.orderFactory.createOrder(customerName);
        this.orders.push(newOrder);
        return newOrder;
    }

    public getOrderById(orderId: number): IOrder | undefined {
        return this.orders.find(order => order.id === orderId);
    }

    public addProductToOrder(orderId: number, product: IProduct): void {
        const order = this.getOrderById(orderId);

        if (order) {
            order.addProduct(product);
        } else {
            throw new Error('order not found');
        }
    }
}

class ProductRepository implements IProductRepository {
    private products: IProduct[];

    constructor(productsStorage: IProduct[]) {
        this.products = productsStorage;
    }

    public getProductById(productId: number): IProduct | undefined {
        return this.products.find(product => product.id === productId);
    }
}

class OrderController implements IOrderController {
    private orderService: IOrderService;
    private productRepository: IProductRepository;

    constructor(orderService: IOrderService, productRepository: IProductRepository) {
        this.orderService = orderService;
        this.productRepository = productRepository;
    }

    public createOrder(customerName: string): IOrder {
        return this.orderService.createOrder(customerName);
    }

    public addProductToOrder(orderId: number, productId: number): void {
        const product = this.productRepository.getProductById(productId);

        if (product) {
            this.orderService.addProductToOrder(orderId, product);
        } else {
            throw new Error('product not found');
        }
    }

    public getOrderTotalPrice(orderId: number): number {
        const order = this.orderService.getOrderById(orderId);

        if (order) {
            return order.getTotalPrice();
        } else {
            throw new Error('order not found');
        }
    }
}

// use case
const productsStorage: IProduct[] = [
    new Product(1, 'foo', 100),
    new Product(2, 'bar', 200),
    new Product(3, 'fun', 300)
];

const orderFactory: IOrderFactory = new OrderFactory();
const orderService: IOrderService = new OrderService(orderFactory);
const productRepository: IProductRepository = new ProductRepository(productsStorage);
const orderController: IOrderController = new OrderController(orderService, productRepository);

const order = orderController.createOrder('Max Doe');
orderController.addProductToOrder(order.id, 1);
orderController.addProductToOrder(order.id, 2);

console.log(`total price for the order: $${orderController.getOrderTotalPrice(order.id)}`);
