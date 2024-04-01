import { Customer } from "../../domain/user"

export interface ICustomerRepository {
    addCustomer(customer: Customer): Promise<void>
    getCustomers(): Promise<Customer[]>
    getCustomerById(id: string): Promise<Customer | undefined>
    updateCustomer(id: string, customer: Customer): Promise<Customer>
}