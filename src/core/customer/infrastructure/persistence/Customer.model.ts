export class CustomerModel {
    constructor(
        public id: string,
        public name: string,
        public shippingAddress: string,
        public email: string,
        public phoneNumber: string,
        public dateOfBirth: Date,
    ) {}
}