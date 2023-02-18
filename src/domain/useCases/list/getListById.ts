import { List } from '@/common/models/list'

export async function getListByIdUseCase(id: string): Promise<List> {
    const result = await fetch(`/api/list/${id}`)

    const list = (await result.json()) as List

    return list
}
