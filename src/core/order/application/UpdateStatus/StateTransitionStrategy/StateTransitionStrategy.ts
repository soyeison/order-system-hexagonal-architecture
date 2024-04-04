import { OrderStatus } from "../../../../../shared/domain/OrderState.enum";
import { CancelTransitionStrategy } from "./CancelTransitionStrategy";
import { ConfirmTransitionStrategy } from "./ConfirmTransitionStrategy";
import { DeliverTransitionStrategy } from "./DeliverTransitionStrategy";
import { ShipTransitionStrategy } from "./ShipTransitionStrategy";
import { IStateTransitionStrategy } from "./StateTransitionStrategy.interface";

export const transitionStrategies = new Map<string, IStateTransitionStrategy> ()
transitionStrategies.set(OrderStatus.Confirmed, new ConfirmTransitionStrategy());
transitionStrategies.set(OrderStatus.Shipped, new ShipTransitionStrategy());
transitionStrategies.set(OrderStatus.Delivered, new DeliverTransitionStrategy());
transitionStrategies.set(OrderStatus.Cancelled, new CancelTransitionStrategy());