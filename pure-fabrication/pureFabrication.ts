interface IOrder {
    orderId: number;
    amount: number;
}

interface ILogger {
    log(message: string): void;
}

interface IOrderService {
    processOrder(order: IOrder): void;
}

class Order implements IOrder {
    public readonly orderId: number;
    public readonly amount: number;

    constructor(orderId: number, amount: number) {
        this.orderId = orderId;
        this.amount = amount;
    }
}

class Logger implements ILogger {
    public log(message: string): void {
        console.log(`[LOG]: ${message}`);
    }
}

class OrderService implements IOrderService {
    private readonly logger: ILogger;

    constructor(logger: ILogger) {
        this.logger = logger;
    }

    public processOrder(order: IOrder): void {
        this.logger.log(`processing order ${order.orderId} for amount ${order.amount}`);
        console.log(`order service: order ${order.orderId} processed`);
    }
}

// use case
const logger: ILogger = new Logger();
const orderService: IOrderService = new OrderService(logger);
const order: IOrder = new Order(1, 250.0);

orderService.processOrder(order);