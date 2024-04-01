import { BaseUseCase } from "../../../../shared/application/BaseUseCase.interface";
import { Customer } from "../../domain/user";

export interface GetAllCustomersOutput {
    customers: Customer[]
}

export interface GetAllCustomersUseCase extends BaseUseCase<void, GetAllCustomersOutput> {} 