export type TListContentItem = Record<string, string> & {
    value: string
}

export interface ListInput {
    name: string
    description: string
    maxSize: number
    image?: File | null
}

export interface List extends Omit<ListInput, 'image'> {
    id: string
    content: TListContentItem[]
    image: string
}

export interface ListContentItemInput {
    id: string
    content: TListContentItem[]
}
