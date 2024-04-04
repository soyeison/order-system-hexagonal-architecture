import { BaseUseCase } from "../../../../shared/application/BaseUseCase.interface"
import { Customer } from "../../../customer/domain/User"
import { Product } from "../../../product/domain/Product"
import { Order } from "../../domain/Order"

export interface CreateOrderInput {
    products: Product[]
    customer: Customer
}

export interface CreateOrderOutput {
    order: Order
}

export interface ICreateOrder extends BaseUseCase<CreateOrderInput, CreateOrderOutput> {}