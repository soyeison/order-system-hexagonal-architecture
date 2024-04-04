import { OrderStatus } from "../../../../shared/domain/OrderState.enum";

export class OrderModel {
    constructor(
        public id: string,
        public customerId: string,
        public totalPrice: number,
        public status: OrderStatus,
        public createdAt: Date
    ) {}
}