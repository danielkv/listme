import { FormikErrors, useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import * as yup from 'yup'

import { FocusEvent, FormEvent, useState } from 'react'

import { useNotification } from '@/common/hooks/useNotification'
import { getErrorMessage } from '@/common/utils/getErrorMessage'
import { createListUseCase } from '@/domain/useCases/list/create-list'

import { CreateListForm } from './types'

const initialFormData: CreateListForm = {
    name: '',
    description: '',
    maxSize: 0,
}

const validationSchema = yup.object().shape({
    name: yup.string().required('O nome da lista é obrigatório'),
    description: yup.string().required('A descrição da lista é obrigatório'),
    maxSize: yup
        .number()
        .required('Você precisa setar um número máximo de participantes. 0 para sem limites'),
})

export interface CreateListViewModelHook {
    isSubmitting: boolean
    values: CreateListForm
    errors: FormikErrors<CreateListForm>
    image: File | null
    handleChangeImage: (file: File | null) => void
    handleSubmitCreateList: (e?: FormEvent<HTMLFormElement> | undefined) => void
    handleChange: (field: string) => (value: any) => void
    handleBlur: (e: FocusEvent<any, Element>) => void
}

export const useCreateListViewModel = (): CreateListViewModelHook => {
    const { push } = useRouter()
    const [image, handleChangeImage] = useState<File | null>(null)
    const notification = useNotification()

    const onClickCreateList = async (result: CreateListForm) => {
        try {
            const response = await createListUseCase({ ...result, image })

            push(`/list/${response.id}`)
        } catch (err) {
            notification.push(getErrorMessage(err), 'error')
        }
    }

    const { errors, values, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: initialFormData,
        validationSchema,
        onSubmit: onClickCreateList,
    })

    return {
        isSubmitting,
        errors,
        values,
        image,
        handleChangeImage,
        handleChange: (field: string) => handleChange(field),
        handleBlur,
        handleSubmitCreateList: handleSubmit,
    }
}
