import { OrderModel } from "../Order.model";
import { IOrderDB } from "./OrderDB.interface";

export class OrderDB implements IOrderDB {
    private orders: OrderModel[]

    constructor() {
        this.orders = []
    }

    async addOrder(orderModel: OrderModel): Promise<void> {
        try {
            this.orders.push(orderModel)
        } catch (error) {
            console.log(error)
            throw new Error('Error agregando orden a la DB en memoria')
        }
    }
    
    async getOrders(): Promise<OrderModel[]> {
        try {
            return this.orders
        } catch (error) {
            console.log(error)
            throw new Error('Error onteniendo las orders de memoria')
        }
    }

    async getOrderById(id: string): Promise<OrderModel | undefined> {
        try {
            return this.orders.find((order) => order.id === id)
        } catch (error) {
            console.log(error)
            throw new Error('Error obteniendo la orden desde memoria')
        }
    }

    async updateOrder(id: string, updatedOrderModel: OrderModel): Promise<OrderModel> {
        try {
            const index = this.orders.findIndex((order) => order.id === id)
            if (index !== -1) {
                this.orders[index] = updatedOrderModel
                return updatedOrderModel
            } else {
                throw new Error('Error encontrando la orden en memoria')
            }
        } catch (error) {
            console.log(error)
            throw new Error('')
        }
    }
    
}