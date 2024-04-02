import { OrderStatus } from "../../../shared/domain/OrderState.enum";
import { Customer } from "../../customer/domain/User";
import { Product } from "../../product/domain/Product";

export class Order {
    id: string;
    products: Product[];
    customer: Customer;
    totalPrice: number;
    status: OrderStatus;
    createdAt: Date;

    constructor(
        id: string, 
        products: Product[], 
        customer: Customer, 
        totalPrice: number, 
        status: OrderStatus, 
        createdAt: Date
    ) {
        this.id = id;
        this.products = products;
        this.customer = customer;
        this.totalPrice = totalPrice;
        this.status = status;
        this.createdAt = createdAt;
    }
}