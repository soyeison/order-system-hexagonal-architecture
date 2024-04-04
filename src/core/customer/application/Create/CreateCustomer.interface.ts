import { BaseUseCase } from "../../../../shared/application/BaseUseCase.interface";
import { Customer } from "../../domain/User";

export interface CreateCustomerInput {
    name: string;
    shippingAddress: string;
    contactInfo: {
        email: string;
        phoneNumber: string;
        dateOfBirth: Date
    };
}

export interface CreateCustomerOutput {
    customer: Customer
}

export interface ICreateCustomer extends BaseUseCase<CreateCustomerInput, CreateCustomerOutput> {}