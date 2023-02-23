import { List } from '@/common/models/list'
import httpClient from '@/common/providers/httpClient'

export async function getListByIdUseCase(id: string): Promise<List> {
    const list = await httpClient.get<List>(`/api/list/${id}`)

    return list
}
