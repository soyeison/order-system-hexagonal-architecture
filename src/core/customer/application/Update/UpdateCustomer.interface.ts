import { BaseUseCase } from "../../../../shared/application/BaseUseCase.interface";
import { Customer } from "../../domain/User";

export interface UpdateCustomerInput {
    customerId: string;
    changes: Partial<Customer>
}

export interface UpdateCustomerOutput {
    updatedCustomer: Customer
}

export interface IUpdateCustomer extends BaseUseCase<UpdateCustomerInput, UpdateCustomerOutput> {}