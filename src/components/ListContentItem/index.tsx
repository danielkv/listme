import { motion } from 'framer-motion'

import { TListContentItem } from '@/common/models/list'
import CheckIcon from '@rsuite/icons/Check'

export interface ListContentItemProps {
    content: TListContentItem
}

export const ListContentItem: React.FC<ListContentItemProps> = ({ content }) => {
    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', mass: 0.8, damping: 5 }}
        >
            <div className="mt-2">
                <div className="flex border-solid border-2 px-4 py-3 border-emerald-500 rounded-md justify-between">
                    <h5>{content.value}</h5>
                    <CheckIcon className="text-emerald-500" style={{ fontSize: 24 }} />
                </div>
            </div>
        </motion.div>
    )
}
