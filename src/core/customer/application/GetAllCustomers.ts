import { ICustomerRepository } from "./interfaces/CustomerRepository.interface";
import { GetAllCustomersOutput, GetAllCustomersUseCase } from "./interfaces/GetAllCustomers.interface"


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