export class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    quantityAvailable: number;

    constructor(id: string, name: string, description: string, price: number, quantityAvailable: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantityAvailable = quantityAvailable;
    }
}