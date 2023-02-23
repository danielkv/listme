import { getListByIdUseCase } from '@/domain/useCases/list/getListById'
import SingleListView from '@/view/SingleList'

export interface SingleListPageProps {
    params: { id: string }
}

export async function generateMetadata({ params }: SingleListPageProps) {
    const list = await getListByIdUseCase(params.id)

    return { title: list.name }
}

const SingleListPage = ({ params }: SingleListPageProps) => {
    return <SingleListView id={params.id} />
}

export default SingleListPage
