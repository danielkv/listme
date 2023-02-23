import { List, ListContentItemInput, TListContentItem } from '@/common/models/list'
import httpClient from '@/common/providers/httpClient'

export async function addContentItemUseCase(
    id: string,
    content: TListContentItem[]
): Promise<List> {
    const body: ListContentItemInput = {
        id,
        content,
    }

    const list = await httpClient.post<List>(`/api/list/content`, JSON.stringify(body), {
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return list
}
