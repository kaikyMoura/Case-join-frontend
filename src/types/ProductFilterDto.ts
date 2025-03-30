export type ProductFilterDto = {
    name?: string,
    brand?: string,
    category?: string,
    minPrice?: number,
    maxPrice?: number,
    page?: number,
    pageSize?: number
}