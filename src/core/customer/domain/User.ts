import { IContactInformation } from "./ContactInformation.interface"

export class Customer {
    id: string
    name: string
    shippingAddress: string
    contactInfo: IContactInformation
    
    constructor(
        id: string,
        name: string,
        shippingAddress: string,
        contactInfo: IContactInformation,
    ) {
        this.id = id
        this.name = name
        this.shippingAddress = shippingAddress
        this.contactInfo = contactInfo
    }
}