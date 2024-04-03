import { ICustomerRepository } from "../../domain/CustomerRepository.interface"
import { Customer } from "../../domain/User"
import { CustomerModel } from "./Customer.model"
import { CustomerDB } from "./memory/CustomerDB"

export class CustomerRepository implements ICustomerRepository {
    constructor(private readonly customerRepo: CustomerDB) {}

    async addCustomer(customer: Customer): Promise<void> {
        try {
            const cutomerModel = new CustomerModel(
                customer.id, 
                customer.name, 
                customer.shippingAddress,
                customer.contactInfo.email,
                customer.contactInfo.phoneNumber,
                customer.contactInfo.dateOfBirth
            )
            await this.customerRepo.addCustomer(cutomerModel)
        } catch (error) {
            console.log(error)
            throw new Error('El customer no se ha podido crear')
        }
    }

    async getCustomers(): Promise<Customer[]> {
        try {
            const customersModel = await this.customerRepo.getCustomers()

            return customersModel.map((customerModel) => {
                return new Customer(
                    customerModel.id,
                    customerModel.name,
                    customerModel.shippingAddress,
                    {
                        email: customerModel.email,
                        phoneNumber: customerModel.phoneNumber,
                        dateOfBirth: customerModel.dateOfBirth
                    }
                )
            })            
        } catch (error) {
            console.log(error)
            throw new Error('No ha sido posible obtener todos los registros')
        }
    }

    async getCustomerById(id: string): Promise<Customer | null> {
        try {
            const customerModel = await this.customerRepo.getCustomerById(id)

            if (!customerModel) {
                return null
            }

            return new Customer(
                customerModel.id,
                customerModel.name,
                customerModel.shippingAddress,
                {
                    email: customerModel.email,
                    phoneNumber: customerModel.phoneNumber,
                    dateOfBirth: customerModel.dateOfBirth
                }
            )
        } catch (error) {
            console.log(error)
            throw new Error('Customer no encontrado')
        }
    }

    async updateCustomer(id: string, customer: Customer) {
        try {
            const customerModel = new CustomerModel(
                customer.id, 
                customer.name, 
                customer.shippingAddress,
                customer.contactInfo.email,
                customer.contactInfo.phoneNumber,
                customer.contactInfo.dateOfBirth
            )
            const customerModelUpdated = await this.customerRepo.updateCustomer(id, customerModel)

            return new Customer(
                customerModel.id,
                customerModel.name,
                customerModel.shippingAddress,
                {
                    email: customerModel.email,
                    phoneNumber: customerModel.phoneNumber,
                    dateOfBirth: customerModel.dateOfBirth
                }
            )
        } catch (error) {
            console.log(error)
            throw new Error('El customer no se ha podido actualizado')
        }
    }
}