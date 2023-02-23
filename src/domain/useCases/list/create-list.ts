import { List, ListInput } from '@/common/models/list'

export async function createListUseCase(list: ListInput): Promise<List> {
    const formData = new FormData()
    if (list.image) {
        formData.append('file', list.image)
        formData.append('fileName', list.image.name)
    }

    formData.append('name', list.name)
    formData.append('description', list.description)
    formData.append('maxSize', String(list.maxSize))

    const result = await fetch(`/api/list`, {
        method: 'POST',
        body: formData,
    })

    const response = (await result.json()) as List

    return response
}
