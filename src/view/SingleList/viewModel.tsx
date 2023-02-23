import useSWR from 'swr'

import { FormEvent, RefObject, useRef, useState } from 'react'

import { useNotification } from '@/common/hooks/useNotification'
import { List, TListContentItem } from '@/common/models/list'
import { getErrorMessage } from '@/common/utils/getErrorMessage'
import { addContentItemUseCase } from '@/domain/useCases/list/addContentItem'
import { getListByIdUseCase } from '@/domain/useCases/list/getListById'

export interface singleListViewModelHook {
    loading: boolean
    loadingAdd: boolean
    fieldsDisabled: boolean
    list?: List
    newContentItem: string
    newContentInputRef: RefObject<HTMLInputElement>
    handleChangeNewContentItem: (value: string) => void
    handleAdd: (e?: FormEvent<HTMLFormElement> | undefined) => Promise<void>
}

export interface SingleListViewModelArgs {
    id: string
}

export const useSingleListViewModel = ({
    id,
}: SingleListViewModelArgs): singleListViewModelHook => {
    const [newContentItem, handleChangeNewContentItem] = useState('')
    const [loadingAdd, setLoadingAdd] = useState(false)
    const notification = useNotification()

    const newContentInputRef = useRef<HTMLInputElement>(null)

    const {
        data: list,
        isLoading,
        mutate,
    } = useSWR<List>([id, 'listById'], (_id: string[]) => getListByIdUseCase(_id[0]))

    const handleAdd = async () => {
        if (!newContentItem) return
        setLoadingAdd(true)

        try {
            const newContent: TListContentItem = { value: newContentItem }

            const result = await addContentItemUseCase(id, [newContent])

            await mutate(result)

            handleChangeNewContentItem('')

            notification.push('Adicionado com sucesso', 'success')

            setTimeout(() => {
                newContentInputRef.current?.select()
                newContentInputRef.current?.focus()
            }, 500)
        } catch (err) {
            notification.push(getErrorMessage(err), 'error')
        } finally {
            setLoadingAdd(false)
        }
    }

    return {
        list,
        loadingAdd,
        fieldsDisabled: isLoading || loadingAdd,
        loading: isLoading,
        newContentItem,
        newContentInputRef,
        handleChangeNewContentItem,
        handleAdd,
    }
}
