import { ApiError } from 'next/dist/server/api-utils'

export class NotFoundException extends ApiError {
    public readonly statusCode: number = 404

    constructor(message?: string) {
        super(404, message || 'Not Found')
    }
}

export class BadRequestException extends ApiError {
    constructor(message: string) {
        super(500, message)
    }
}
