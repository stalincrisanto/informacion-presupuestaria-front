export interface ApiError {
    status: number;
    message: string;
    errors?: {
        [key: string]: string[];
    };
}

export interface ApiResponse<T> {
    data?: T;
    error?: ApiError;
    status: number;
}

export interface ValidationError {
    field: string;
    message: string;
}

export interface ApiErrorResponse {
    statusCode: number;
    message: string;
    error?: string;
    validationErrors?: ValidationError[];
}

// Función helper para manejar errores de la API
export const handleApiError = (error: unknown): ApiError => {
    if (error instanceof Error) {
        return {
            status: 500,
            message: error.message
        };
    }

    if (typeof error === 'object' && error !== null) {
        const apiError = error as ApiErrorResponse;
        return {
            status: apiError.statusCode || 500,
            message: apiError.message || 'Error desconocido',
            errors: apiError.validationErrors?.reduce((acc, curr) => {
                acc[curr.field] = [curr.message];
                return acc;
            }, {} as { [key: string]: string[] })
        };
    }

    return {
        status: 500,
        message: 'Error desconocido'
    };
};