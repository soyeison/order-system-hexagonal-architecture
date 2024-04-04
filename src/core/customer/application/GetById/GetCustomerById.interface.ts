import { BaseUseCase } from "../../../../shared/application/BaseUseCase.interface"
import { Customer } from "../../domain/User"

export interface GetCustomerByIdInput {
    customerId: string
}

export interface GetCustomerByIdOutput {
    customer: Customer
}

export interface IGetCustomerById extends BaseUseCase<GetCustomerByIdInput, GetCustomerByIdOutput> {}