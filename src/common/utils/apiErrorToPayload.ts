import { ApiError } from 'next/dist/server/api-utils'

export function apiErrorToPayload(err: ApiError) {
    return {
        statusCode: err.statusCode,
        message: err.message,
        timestamp: Date.now(),
    }
}
