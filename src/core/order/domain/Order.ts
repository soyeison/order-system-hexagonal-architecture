import { OrderStatus } from "../../../shared/domain/OrderState.enum";
import { Customer } from "../../customer/domain/User";
import { Product } from "../../product/domain/Product";

export class Order {
    id: string;
    products: Product[];
    customer: Customer;
    totalPrice: number = 0;
    status: OrderStatus;
    createdAt: Date;

    constructor(
        id: string, 
        products: Product[], 
        customer: Customer, 
        status: OrderStatus, 
        createdAt: Date
    ) {
        this.id = id;
        this.products = products;
        this.customer = customer;
        this.status = status;
        this.createdAt = createdAt;

        this.calcTotalPrice()
    }

    public addProducts(...products: Product[]) {
        this.products.push(...products)
    }

    public removeProducts(productId: string) {
        this.products = this.products.filter((product) => product.id !== productId)
    }

    public calcTotalPrice(): number {
        return this.totalPrice = this.products.reduce((previous, current) => {
            return previous + current.price
        }, 0)
    }
}