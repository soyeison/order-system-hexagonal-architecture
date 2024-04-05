import { Sequelize } from "sequelize";
import { Order } from "../../domain/Order";
import { IOrderRepository } from "../../domain/OrderRepository.interface";
import { OrderInput } from "./sequelize/OrderEntity.model";
import { ICustomerRepository } from "../../../customer/domain/CustomerRepository.interface";
import { Customer } from "../../../customer/domain/User";

export class OrderRepository implements IOrderRepository {
    constructor(
        private readonly sequelizeRepo: Sequelize,
        private readonly customerRepo: ICustomerRepository
    ) {}

    async addOrder(order: Order): Promise<void> {
        const adapter: OrderInput = {
            id: order.id,
            customerId: order.customer.id,
            status: order.status,
            totalPrice: order.totalPrice
        }
        await this.sequelizeRepo.models.Order.create(adapter)
    }

    async getOrders(): Promise<Order[]> {
        const orderDB = await this.sequelizeRepo.models.Order.findAll()
        const orderResp = []
        for (let i = 0; i < orderDB.length; i++) {
            const element = orderDB[i];
            const orderJSON: OrderInput = element.toJSON()
            const customer = await this.customerRepo.getCustomerById(orderJSON.customerId)
            const orderEntityMapped = new Order(
                orderJSON.id as string,
                [],
                customer as Customer,
                orderJSON.status,
                orderJSON.createdAt as Date
            )
            orderResp.push(orderEntityMapped)
        }

        return orderResp
    }

    async getOrderById(id: string): Promise<Order> {
        const orderDB = await this.sequelizeRepo.models.Order.findByPk(id)

        if (!orderDB) {
            throw new Error('No existe el customer')
        }

        const orderJSON: OrderInput = orderDB.toJSON()
        const customer = await this.customerRepo.getCustomerById(orderJSON.customerId)
        return new Order(
            orderJSON.id as string,
            [],
            customer as Customer,
            orderJSON.status,
            orderJSON.createdAt as Date
        )
    }

    async updateOrder(id: string, order: Order): Promise<Order> {
        const orderDB = await this.sequelizeRepo.models.Order.findByPk(id)

        if (!orderDB) {
            throw new Error('No existe el customer')
        }

        const orderUpdated = await orderDB.update(order)
        const orderJSON: OrderInput = orderUpdated.toJSON()
        const customer = await this.customerRepo.getCustomerById(orderJSON.customerId)
        return new Order(
            orderJSON.id as string,
            [],
            customer as Customer,
            orderJSON.status,
            orderJSON.createdAt as Date
        )
    }
}