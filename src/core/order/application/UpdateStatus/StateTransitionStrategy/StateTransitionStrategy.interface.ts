import { Order } from "../../../domain/Order";

export interface IStateTransitionStrategy {
    executeTransition(order: Order): void;
    canTransition(order: Order): boolean;
}