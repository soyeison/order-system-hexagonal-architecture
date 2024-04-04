import { Customer } from "./User"

export interface ICustomerRepository {
    addCustomer(customer: Customer): Promise<void>
    getCustomers(): Promise<Customer[]>
    getCustomerById(id: string): Promise<Customer>
    updateCustomer(id: string, customer: Customer): Promise<Customer>
}