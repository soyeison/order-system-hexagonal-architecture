import { Order } from "../../../domain/Order";
import { IStateTransitionStrategy } from "./StateTransitionStrategy.interface";

export class CancelTransitionStrategy implements IStateTransitionStrategy {
    executeTransition(order: Order): void {
        throw new Error("Method not implemented.");
    }
    canTransition(order: Order): boolean {
        throw new Error("Method not implemented.");
    }
}