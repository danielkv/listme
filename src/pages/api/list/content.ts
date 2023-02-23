import { NextApiRequest, NextApiResponse } from 'next'

import { BadRequestException, NotFoundException } from '@/common/exceptions'
import { List, ListContentItemInput } from '@/common/models/list'
import { db } from '@/common/providers/firebase'
import { withApiException } from '@/common/utils/withApiException'

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') throw new NotFoundException("Path doesn't exist")

    const { content: newContent, id } = req.body as ListContentItemInput

    if (!newContent || !id) throw new BadRequestException("body doesn't satifies the endpoint")

    const listsRef = db.collection('lists').doc(id)

    const result = await listsRef.get()
    const oldData = result.data() as List
    const oldContent = oldData.content || []
    if (oldContent.length + newContent.length > oldData.maxSize)
        throw new Error('List já atingiu o máximo de participantes')

    const newData = {
        ...oldData,
        content: [...oldContent, ...newContent],
    } as List

    await listsRef.set(newData)

    return res.status(201).json(newData)
}

export default withApiException(handler)
