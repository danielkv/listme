import { ApiError } from 'next/dist/server/api-utils'

export class HttpClient {
    readonly config: RequestInit = {}
    readonly baseURL = process.env.NEXT_PUBLIC_BASE_API_URL

    private extendConfig(extra?: RequestInit) {
        if (!extra) return this.config

        return { ...this.config, ...extra }
    }

    private async go<T>(path: string, config?: RequestInit): Promise<T> {
        const response = await fetch(`${this.baseURL}${path}`, this.extendConfig(config))

        if (!response.ok) {
            const errData = await response.json()
            throw new ApiError(errData.statusCode, errData.message)
        }

        const result = await response.json()

        return result as T
    }

    get<T>(path: string, config?: Omit<RequestInit, 'method'>): Promise<T> {
        return this.go<T>(path, { ...config, method: 'GET' })
    }

    post<T>(
        path: string,
        body?: BodyInit,
        config?: Omit<RequestInit, 'method' | 'body'>
    ): Promise<T> {
        return this.go<T>(path, { ...config, body, method: 'POST' })
    }
}

const httpClient = new HttpClient()
export default httpClient
