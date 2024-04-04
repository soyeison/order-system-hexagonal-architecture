import { Order } from "./Order"

export interface IOrderRepository {
    addOrder(order: Order): Promise<void>
    getOrders(): Promise<Order[]>
    getOrderById(id: string): Promise<Order | null>
    updateOrder(id: string, order: Order): Promise<Order>
}