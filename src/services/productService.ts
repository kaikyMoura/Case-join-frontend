import axios, { AxiosError } from "axios"
import api from "./api"
import { Product } from "@/types/Product"

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

const findProducts = async (name?: string, category?: string, brand?: string, minPrice?: number, maxPrice?: number, page?: number, pageSize?: number): Promise<ApiResponse<Product[]>> => {

    const categoryUpperCase = category ? category.toUpperCase() : undefined
    try {
        const response = await api.get('/product', {
            params: {
                name,
                categoryUpperCase,
                brand,
                minPrice,
                maxPrice,
                page,
                pageSize
            }
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
    createProduct,
    findProducts,
    deleteProductById
}