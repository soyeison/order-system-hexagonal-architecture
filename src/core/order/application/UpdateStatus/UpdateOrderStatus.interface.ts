import { BaseUseCase } from "../../../../shared/application/BaseUseCase.interface"
import { OrderStatus } from "../../../../shared/domain/OrderState.enum"
import { Order } from "../../domain/Order"

export interface UpdateOrderStatusInput {
    orderId: string
    newStatus: OrderStatus
}

export interface UpdateOrderStatusOutput {
    order: Order
}

export interface IUpdateOrderStatus extends BaseUseCase<UpdateOrderStatusInput, UpdateOrderStatusOutput> {}