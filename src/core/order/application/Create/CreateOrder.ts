import { OrderStatus } from "../../../../shared/domain/OrderState.enum"
import { UUIDGenerator } from "../../../../shared/domain/Uuid"
import { Customer } from "../../../customer/domain/User"
import { Product } from "../../../product/domain/Product"
import { Order } from "../../domain/Order"
import { IOrderRepository } from "../../domain/OrderRepository.interface"
import { CreateOrderInput, CreateOrderOutput, ICreateOrder } from "./CreateOrder.interface"

export class CreateOrderImpl implements ICreateOrder {
    constructor(private readonly orderRepositoryRepo: IOrderRepository) {}

    async execute(input: CreateOrderInput): Promise<CreateOrderOutput> {
        const order = await this.createOrder(input.products, input.customer)

        await this.orderRepositoryRepo.addOrder(order)
        
        return {
            order
        }
    }

    private async createOrder(products: Product[], customer: Customer): Promise<Order> {
        try {
            const id = UUIDGenerator.generateUUID()
            const totalPrice = this.getTotalPrice(products)
            const newOrder = new Order(id, products, customer, totalPrice, OrderStatus.Pending, new Date)

            return newOrder
        } catch (error) {
            console.log(error)
            throw new Error('')
        }
    }

    private getTotalPrice(products: Product[]) {
        return products.reduce((total, products) => total + products.price, 0)
    }
}