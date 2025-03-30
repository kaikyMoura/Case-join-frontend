import { Category } from "./CategoryEnum";

export type Product = {
    id?: string;
    name: string;
    description: string;
    brand: string;
    category: Category;
    price: number;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
};