import { OrderStatus } from "../../../../../shared/domain/OrderState.enum"
import { Order } from "../../../domain/Order"
import { IStateTransitionStrategy } from "./StateTransitionStrategy.interface"

export class ConfirmTransitionStrategy implements IStateTransitionStrategy {
    
    executeTransition(order: Order): void {
        order.status = OrderStatus.Confirmed
    }

    canTransition(order: Order): boolean {
        if (order.status !== OrderStatus.Pending) {
            return false
        }

        return true
    }
}