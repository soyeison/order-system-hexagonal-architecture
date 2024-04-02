import { ICustomerRepository } from "../../domain/CustomerRepository.interface";
import { GetAllCustomersOutput, GetAllCustomersUseCase } from "./GetAllCustomers.interface"


export class GetAllCustomersImpl implements GetAllCustomersUseCase {
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