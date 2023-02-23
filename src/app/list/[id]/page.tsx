import Image from 'next/image'
import { Badge, Button, Form, Input, Loader } from 'rsuite'

import SingleListView from '@/view/SingleList'

import ContentItems from './content-items'
import { useSingleListViewModel } from './viewModel'

export interface SingleListPageProps {
    params: { id: string }
}

export async function generateMetadata(...props) {
    console.log('props', props)

    return { title: 'Testee1' }
}

const SingleListPage = ({ params }: SingleListPageProps) => {
    return <SingleListView id={params.id} />
}

export default SingleListPage
