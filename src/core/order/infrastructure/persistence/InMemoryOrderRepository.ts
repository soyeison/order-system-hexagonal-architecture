import { ICustomerRepository } from "../../../customer/domain/CustomerRepository.interface"
import { Customer } from "../../../customer/domain/User"
import { Product } from "../../../product/domain/Product"
import { IProductRepository } from "../../../product/domain/ProductRepository.interface"
import { Order } from "../../domain/Order"
import { IOrderRepository } from "../../domain/OrderRepository.interface"
import { OrderModel } from "./memory/Order.model"
import { OrderDB } from "../../../../shared/infrastructure/persistence/memory/OrderDB"

export class OrderRepository implements IOrderRepository {
    constructor(
        private readonly orderRepo: OrderDB,
        private readonly customerRepo: ICustomerRepository,
        private readonly productRepo: IProductRepository
    ) {}

    async addOrder(order: Order): Promise<void> {
        const productIds = order.products.map((product) => (product.id))
        const orderModel = new OrderModel(
            order.id,
            order.customer.id,
            productIds,
            order.totalPrice,
            order.status,
            order.createdAt
        )
        await this.orderRepo.addOrder(orderModel)
    }

    private async getProducts(orderModel: OrderModel): Promise<Product[]> {
        const productsResp = []
            for (let j = 0; j < orderModel.productIds.length; j++) {
                const productId = orderModel.productIds[j];
                const product = await this.productRepo.getProductById(productId)
                productsResp.push(product)
            }
        return productsResp
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

            const products = await this.getProducts(orderModel)

            const newOrder = new Order(
                orderModel.id,
                products,
                customer,
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

        const products = await this.getProducts(orderModel)

        return new Order(
            orderModel.id,
            products,
            customer,
            orderModel.status,
            orderModel.createdAt,
        )
    }

    async updateOrder(id: string, order: Order): Promise<Order> {
        const productIds = order.products.map((product) => (product.id))
        const orderModel = new OrderModel(
            order.id,
            order.customer.id,
            productIds,
            order.totalPrice,
            order.status,
            order.createdAt,
        )

        await this.orderRepo.updateOrder(id, orderModel)

        return order
    }
}