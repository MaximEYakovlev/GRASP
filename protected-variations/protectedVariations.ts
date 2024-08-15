interface IShippingCostStrategy {
    calculateCost(weight: number, distance: number): number;
}

interface IShippingService {
    setStrategy(strategy: IShippingCostStrategy): void;
    calculateShippingCost(weight: number, distance: number): number;
}

class StandardShipping implements IShippingCostStrategy {
    public calculateCost(weight: number, distance: number): number {
        return weight * distance * 0.5;
    }
}

class ExpressShipping implements IShippingCostStrategy {
    public calculateCost(weight: number, distance: number): number {
        return weight * distance * 1.0 + 10;
    }
}

class HeavyItemsShipping implements IShippingCostStrategy {
    public calculateCost(weight: number, distance: number): number {
        return weight > 10 ? weight * distance * 2.0 : weight * distance * 1.5;
    }
}

class ShippingService implements IShippingService {
    private strategy: IShippingCostStrategy;

    constructor(strategy: IShippingCostStrategy) {
        this.strategy = strategy;
    }

    public setStrategy(strategy: IShippingCostStrategy): void {
        this.strategy = strategy;
    }

    public calculateShippingCost(weight: number, distance: number): number {
        return this.strategy.calculateCost(weight, distance);
    }
}

// use case
const standardShipping: IShippingCostStrategy = new StandardShipping();
const shippingService: IShippingService = new ShippingService(standardShipping);

let cost = shippingService.calculateShippingCost(5, 100);
console.log(`standard shipping cost: ${cost}`);

const expressShipping: IShippingCostStrategy = new ExpressShipping();
shippingService.setStrategy(expressShipping);

cost = shippingService.calculateShippingCost(5, 100);
console.log(`express shipping cost: ${cost}`);

const heavyItemsShipping: IShippingCostStrategy = new HeavyItemsShipping();
shippingService.setStrategy(heavyItemsShipping);

cost = shippingService.calculateShippingCost(13, 100);
console.log(`heavy items shipping cost: ${cost}`);
