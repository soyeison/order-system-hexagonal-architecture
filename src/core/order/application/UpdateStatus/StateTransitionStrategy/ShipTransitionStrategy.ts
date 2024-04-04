import { OrderStatus } from "../../../../../shared/domain/OrderState.enum"
import { Order } from "../../../domain/Order"
import { IStateTransitionStrategy } from "./StateTransitionStrategy.interface"

export class ShipTransitionStrategy implements IStateTransitionStrategy {
    executeTransition(order: Order): void {
        order.status = OrderStatus.Shipped
    }

    canTransition(order: Order): boolean {
        if (order.status !== OrderStatus.Confirmed) {
            return false
        }

        return true
    }
}