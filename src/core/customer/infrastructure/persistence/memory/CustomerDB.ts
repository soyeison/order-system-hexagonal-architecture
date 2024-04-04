import { Customer } from "../../../domain/User"
import { CustomerModel } from "../Customer.model"
import { ICustomerDB } from "./CustomerDB.interface"

export class CustomerDB implements ICustomerDB {
    private customers: CustomerModel[]

    constructor() {
        this.customers = []
    }

    async addCustomer(customerModel: CustomerModel): Promise<void> {
        try {
            this.customers.push(customerModel)
        } catch (error) {
            console.log(error)
            throw new Error('')
        }
    }

    async getCustomers(): Promise<CustomerModel[]> {
        try {
            return this.customers
        } catch (error) {
            console.log(error)
            throw new Error('')
        }
    }

    async getCustomerById(id: string): Promise<CustomerModel | undefined> {
        try {
            return this.customers.find((customer) => customer.id === id)
        } catch (error) {
            console.log(error)
            throw new Error('')
        }
    }

    async updateCustomer(id: string, updatedCustomerModel: CustomerModel): Promise<CustomerModel> {
        try {
            const index = this.customers.findIndex((customer) => customer.id === id)
            if (index !== -1) {
                this.customers[index] = updatedCustomerModel
                return updatedCustomerModel
            } else {
                throw new Error('Cliente no encontrado')
            }
        } catch (error) {
            console.log(error)
            throw new Error('')
        }
    }
}