import { OrderModel } from "../Order.model"

export interface IOrderDB {
    addOrder(orderModel: OrderModel): Promise<void>
    getOrders(): Promise<OrderModel[]>
    getOrderById(id: string): Promise<OrderModel | undefined>
    updateOrder(id: string, updatedOrderModel: OrderModel): Promise<OrderModel>
}