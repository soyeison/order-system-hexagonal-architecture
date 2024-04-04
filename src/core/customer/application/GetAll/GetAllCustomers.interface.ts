import { BaseUseCase } from "../../../../shared/application/BaseUseCase.interface";
import { Customer } from "../../domain/User";

export interface GetAllCustomersOutput {
    customers: Customer[]
}

export interface IGetAllCustomers extends BaseUseCase<void, GetAllCustomersOutput> {} 