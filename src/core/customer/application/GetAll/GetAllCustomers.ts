import { ICustomerRepository } from "../../domain/CustomerRepository.interface";
import { GetAllCustomersOutput, IGetAllCustomers } from "./GetAllCustomers.interface"


export class GetAllCustomersImpl implements IGetAllCustomers {
    constructor(
        private readonly customerRepositoryRepo: ICustomerRepository
    ) {}

    async execute(): Promise<GetAllCustomersOutput> {
        const customers = await this.customerRepositoryRepo.getCustomers()

        return {
            customers
        }
    }
}