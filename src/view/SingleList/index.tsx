'use client'

import Image from 'next/image'
import { Badge, Button, Form, Input, Loader } from 'rsuite'

import { List } from '@/common/models/list'

import ContentItems from './components/ContentItems'
import { useSingleListViewModel } from './viewModel'

export interface SingleListProps {
    id: string
    initialData?: List
}

export const metadata = {
    title: 'teste',
}

const SingleListView: React.FC<SingleListProps> = ({ id }) => {
    const {
        list,
        fieldsDisabled,
        loading,
        loadingAdd,
        newContentItem,
        newContentInputRef,
        handleChangeNewContentItem,
        handleAdd,
    } = useSingleListViewModel({ id })

    if (loading)
        return (
            <div className="flex flex-1 items-center justify-center gap-4">
                <Loader size="md" />
                <h5 className="test-md font-normal">Carregando lista...</h5>
            </div>
        )

    if (!list) return null

    const listSize = list.content?.length || 0
    const badgeContent = list.maxSize > 0 ? `${listSize}/${list.maxSize}` : listSize

    return (
        <div className="flex flex-col flex-1">
            <header className="bg-slate-500 py-6 mb-6">
                <div className="container mx-auto max-w-lg min-h-[300px]">
                    {list.image && (
                        <Image
                            width={500}
                            height={200}
                            alt={list.name}
                            src={list.image}
                            style={{ objectFit: 'scale-down' }}
                        />
                    )}

                    <div className=" flex items-center gap-4 justify-center">
                        <h1 className="text-center ">{list.name}</h1>
                        <Badge
                            color="yellow"
                            className="text-black text-lg"
                            content={badgeContent}
                        />
                    </div>
                    <div className="text-center">{list.description}</div>
                </div>
            </header>
            <main className="flex flex-1 flex-col container mx-auto max-w-lg">
                <div className="items-stretch">
                    <Form onSubmit={() => handleAdd()}>
                        <Form.Group>
                            <Form.ControlLabel>Participante</Form.ControlLabel>
                            <div className="flex flex-1 gap-4">
                                <Input
                                    disabled={fieldsDisabled}
                                    value={newContentItem}
                                    onChange={handleChangeNewContentItem}
                                    className="flex-1"
                                    name="content"
                                    ref={newContentInputRef}
                                />
                                <Button
                                    disabled={fieldsDisabled}
                                    type="submit"
                                    appearance="primary"
                                    style={{ backgroundColor: '#26bea6' }}
                                    loading={loadingAdd}
                                >
                                    Adicionar
                                </Button>
                            </div>
                        </Form.Group>
                    </Form>
                </div>
                <div className="mt-6 mb-8">
                    <h3 className="text-lg font-normal">Participantes</h3>

                    <ContentItems content={list.content} />
                </div>
            </main>
        </div>
    )
}

export default SingleListView
