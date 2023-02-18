export type TListContentItem = Record<string, string> & {
    value: string
}

export interface ListInput {
    name: string
    description: string
    maxSize: number
}

export interface List extends ListInput {
    id: string
    content: TListContentItem[]
}

export interface ListContentItemInput {
    id: string
    content: TListContentItem[]
}
