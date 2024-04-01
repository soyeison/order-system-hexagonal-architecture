import { BaseUseCase } from "../../../../shared/application/BaseUseCase.interface";
import { Customer } from "../../domain/user";

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

export interface CreateCustomerUseCase extends BaseUseCase<CreateCustomerInput, CreateCustomerOutput> {}