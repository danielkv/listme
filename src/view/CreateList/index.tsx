'use client'

import { Button, Form, Input, InputNumber, Loader, Uploader } from 'rsuite'

import React from 'react'

import { useCreateListViewModel } from './viewModel'

// eslint-disable-next-line react/display-name
const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" />)

export const metadata = {
    title: 'Criar nova lista',
}

const CreateListView: React.FC = () => {
    const {
        isSubmitting,
        values,
        errors,
        image,
        handleChangeImage,
        handleBlur,
        handleChange,
        handleSubmitCreateList,
    } = useCreateListViewModel()

    return (
        <main className="flex flex-1 flex-col gap-5 items-center justify-center">
            <Form
                onSubmit={(_, e) => handleSubmitCreateList(e)}
                className="flex flex-col gap-3 container max-w-lg"
            >
                <h1 className="text-2xl">Crie sua lista</h1>

                <Form.Group>
                    <Form.ControlLabel>Nome</Form.ControlLabel>
                    <Form.Control
                        name="name"
                        onBlur={handleBlur}
                        value={values.name}
                        onChange={handleChange('name')}
                        errorMessage={errors.name}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.ControlLabel>Descrição</Form.ControlLabel>
                    <Form.Control
                        value={values.description}
                        onChange={handleChange('description')}
                        onBlur={handleBlur}
                        name="description"
                        accepter={Textarea}
                        errorMessage={errors.description}
                    />
                </Form.Group>

                <Input
                    type="file"
                    onChange={(_, e) => {
                        const file = e.target.files?.[0] || null
                        handleChangeImage(file)
                    }}
                />

                <Form.Group>
                    <Form.ControlLabel>Máximo de participantes</Form.ControlLabel>
                    <div className="flex flex-row gap-3 items-center justify-center">
                        <div className="flex-1">
                            <InputNumber
                                name="maxSize"
                                value={values.maxSize}
                                onChange={handleChange('maxSize')}
                            />
                            <Form.ErrorMessage show={!!errors.maxSize}>
                                {errors.maxSize}
                            </Form.ErrorMessage>
                        </div>
                        <Form.HelpText tooltip>0 para setar limite</Form.HelpText>
                    </div>
                </Form.Group>

                <Button
                    type="submit"
                    appearance="primary"
                    style={{ backgroundColor: '#26bea6' }}
                    loading={isSubmitting}
                >
                    Criar lista
                </Button>
            </Form>
        </main>
    )
}

export default CreateListView
