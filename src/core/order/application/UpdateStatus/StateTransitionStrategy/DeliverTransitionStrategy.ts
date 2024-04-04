import { OrderStatus } from "../../../../../shared/domain/OrderState.enum"
import { Order } from "../../../domain/Order"
import { IStateTransitionStrategy } from "./StateTransitionStrategy.interface"

export class DeliverTransitionStrategy implements IStateTransitionStrategy {

    executeTransition(order: Order): void {
        order.status = OrderStatus.Delivered
    }

    canTransition(order: Order): boolean {
        if (order.status !== OrderStatus.Shipped) {
            return false
        }

        return true
    }
}