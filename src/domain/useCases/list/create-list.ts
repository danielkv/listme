import { List, ListInput } from '@/common/models/list'
import httpClient from '@/common/providers/httpClient'

export async function createListUseCase(data: ListInput): Promise<List> {
    const formData = new FormData()
    if (data.image) {
        formData.append('file', data.image)
        formData.append('fileName', data.image.name)
    }

    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('maxSize', String(data.maxSize))

    const list = await httpClient.post<List>(`/api/list`, formData)

    return list
}
