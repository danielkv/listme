import { NextApiRequest, NextApiResponse } from 'next'
import { ApiError } from 'next/dist/server/api-utils'

import { BadRequestException, NotFoundException } from '@/common/exceptions'
import { List } from '@/common/models/list'
import { db } from '@/common/providers/firebaseAdmin'
import { withApiException } from '@/common/utils/withApiException'

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') throw new NotFoundException("Path doesn't exist")

    const docId = req.query.id

    if (typeof docId !== 'string') throw new BadRequestException('docId is not set')

    const listsRef = db.collection('lists').where('__name__', '==', docId)

    const results = await listsRef.get()
    if (results.size !== 1) throw new NotFoundException('List not found')

    const result = results.docs[0]

    const data = {
        id: result.id,
        ...result.data(),
    } as List

    return res.status(201).json(data)
}

export default withApiException(handler)
