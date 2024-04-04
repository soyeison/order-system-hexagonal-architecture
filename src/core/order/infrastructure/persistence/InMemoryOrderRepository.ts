import { ICustomerRepository } from "../../../customer/domain/CustomerRepository.interface"
import { Customer } from "../../../customer/domain/User"
import { Order } from "../../domain/Order"
import { IOrderRepository } from "../../domain/OrderRepository.interface"
import { OrderModel } from "./Order.model"
import { OrderDB } from "./memory/OrderDB"

export class OrderRepository implements IOrderRepository {
    constructor(
        private readonly orderRepo: OrderDB,
        private readonly customerRepo: ICustomerRepository
    ) {}

    async addOrder(order: Order): Promise<void> {
        const orderModel = new OrderModel(
            order.id,
            order.customer.id,
            order.totalPrice,
            order.status,
            order.createdAt
        )
        await this.orderRepo.addOrder(orderModel)
    }

    async getOrders(): Promise<Order[]> {
        const ordersModel = await this.orderRepo.getOrders()

        const resp: Order[] = []
        for (let i = 0; i < ordersModel.length; i++) {
            const orderModel = ordersModel[i];
            const customer = await this.customerRepo.getCustomerById(orderModel.customerId)
            if (!customer) {
                continue
            }

            const newOrder = new Order(
                orderModel.id,
                [],
                customer,
                orderModel.totalPrice,
                orderModel.status,
                orderModel.createdAt,
            )

            resp.push(newOrder)
        }

        return resp
    }

    async getOrderById(id: string): Promise<Order | null> {
        const orderModel = await this.orderRepo.getOrderById(id)

        if (!orderModel) {
            return null
        }

        const customer = await this.customerRepo.getCustomerById(orderModel.customerId)

        return new Order(
            orderModel.id,
            [],
            customer,
            orderModel.totalPrice,
            orderModel.status,
            orderModel.createdAt,
        )
    }

    async updateOrder(id: string, order: Order): Promise<Order> {
        const orderModel = new OrderModel(
            order.id,
            order.customer.id,
            order.totalPrice,
            order.status,
            order.createdAt,
        )

        const orderModelUpdated = await this.orderRepo.updateOrder(id, orderModel)

        const customer = await this.customerRepo.getCustomerById(orderModel.customerId)

        return new Order(
            orderModelUpdated.id,
            [],
            customer,
            orderModelUpdated.totalPrice,
            orderModelUpdated.status,
            orderModelUpdated.createdAt
        )
    }
}