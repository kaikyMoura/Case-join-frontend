import axios, { AxiosError } from "axios"
import api from "./api"
import { Product } from "@/types/Product"
import { ProductFilterDto } from "@/types/ProductFilterDto"

type ApiResponse<T> = {
    success?: boolean
    message?: string
    data?: T
    error?: string
}

const createProduct = async (product: Product): Promise<ApiResponse<String>> => {
    try {
        const response = await api.post('/product', product)

        return {
            success: true,
            message: response.data.message,
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError<ApiResponse<String>>;
            if (axiosError.response) {
                return {
                    success: false,
                    error: axiosError.response.data.message
                };
            }
        }
    }
    return {
        error: "Internal server error"
    }
}

const deleteProductById = async (id: string): Promise<ApiResponse<String>> => {
    try {
        const response = await api.delete(`/product/${id}`)

        return {
            success: true,
            message: response.data.message,
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError<ApiResponse<String>>;
            if (axiosError.response) {
                return {
                    success: false,
                    error: axiosError.response.data.message
                };
            }
        }
    }
    return {
        error: "Internal server error"
    }
}

const updateProduct = async (product: Product): Promise<ApiResponse<String>> => {
    try {
        const response = await api.put("/product", product)

        return {
            success: true,
            message: response.data.message,
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError<ApiResponse<String>>;
            if (axiosError.response) {
                return {
                    success: false,
                    error: axiosError.response.data.message
                };
            }
        }
    }
    return {
        error: "Internal server error"
    }
}

const findProductById = async (id: string): Promise<ApiResponse<Product>> => {
    try {
        const response = await api.get(`/product/${id}`)

        return {
            success: true,
            message: response.data.message,
            data: response.data.data
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError<ApiResponse<String>>;
            if (axiosError.response) {
                return {
                    success: false,
                    error: axiosError.response.data.message
                };
            }
        }
    }
    return {
        error: "Internal server error"
    }
}

const findProducts = async (filter: ProductFilterDto): Promise<ApiResponse<Product[]>> => {

    const categoryUpperCase = filter.category ? filter.category.toUpperCase() : undefined
    const params = {
        name: filter.name,
        brand: filter.brand,
        category: categoryUpperCase,
        minPrice: filter.minPrice,
        maxPrice: filter.maxPrice
    };

    try {
        const response = await api.get('/product', {
            params
        })

        return {
            success: true,
            message: response.data.message,
            data: response.data.data
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError<ApiResponse<String>>;
            if (axiosError.response) {
                return {
                    success: false,
                    error: axiosError.response.data.message
                };
            }
        }
    }
    return {
        error: "Internal server error"
    }
}

export {
    findProducts,
    findProductById,
    createProduct,
    updateProduct,
    deleteProductById,
}