import { List, ListContentItemInput, TListContentItem } from '@/common/models/list'

export async function addContentItemUseCase(
    id: string,
    content: TListContentItem[]
): Promise<List> {
    const body: ListContentItemInput = {
        id,
        content,
    }

    const result = await fetch(`/api/list/content`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const list = (await result.json()) as List

    return list
}
