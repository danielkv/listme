import { List, ListInput } from '@/common/models/list'

export async function createListUseCase(list: ListInput): Promise<List> {
    const body = {
        data: list,
    }

    const result = await fetch(`/api/list`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const response = (await result.json()) as List

    return response
}
