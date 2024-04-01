export class Payment {
    id: number;
    type: string;
    cardNumber: string;
    expirationDate: Date;

    constructor(id: number, type: string, cardNumber: string, expirationDate: Date) {
        this.id = id;
        this.type = type;
        this.cardNumber = cardNumber;
        this.expirationDate = expirationDate;
    }
}