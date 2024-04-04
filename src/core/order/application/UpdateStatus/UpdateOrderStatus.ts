import { IOrderRepository } from "../../domain/OrderRepository.interface";
import { IStateTransitionStrategy } from "./StateTransitionStrategy/StateTransitionStrategy.interface";
import { IUpdateOrderStatus, UpdateOrderStatusInput, UpdateOrderStatusOutput } from "./UpdateOrderStatus.interface";

export class UpdateOrderStatusImpl implements IUpdateOrderStatus {
    constructor(
        private readonly orderRepositoryRepo: IOrderRepository,
        private readonly transitionStrategies: Map<string, IStateTransitionStrategy>
    ) {}

    async execute(input: UpdateOrderStatusInput): Promise<UpdateOrderStatusOutput> {
        const order = await this.orderRepositoryRepo.getOrderById(input.orderId)
        if (!order) {
            throw new Error('Order not found');
        }

        const strategy = this.transitionStrategies.get(input.newStatus)
        if (!strategy) {
            throw new Error('Invalid transaction')
        }

        if (!strategy.canTransition(order)) {
            throw new Error('Invalid transaction')
        }

        strategy.executeTransition(order)
        await this.orderRepositoryRepo.updateOrder(input.orderId, order)

        return {
            order
        }
    }
}