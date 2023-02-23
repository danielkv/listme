import { Message } from 'rsuite'

import { TListContentItem } from '@/common/models/list'
import { ListContentItem } from '@/components/ListContentItem'

export interface ContentItemsProps {
    content: TListContentItem[]
}

const ContentItems: React.FC<ContentItemsProps> = ({ content }) => {
    if (!content?.length)
        return (
            <Message showIcon type="info">
                Não há nenhum participante
            </Message>
        )

    return (
        <div>
            {content?.map((item, index) => (
                <ListContentItem key={`${item.value}-${index}`} content={item} />
            ))}
        </div>
    )
}

export default ContentItems
