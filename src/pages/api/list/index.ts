import { NextApiRequest, NextApiResponse } from 'next'

import { NotFoundException } from '@/common/exceptions'
import { List, ListInput } from '@/common/models/list'
import { db } from '@/common/providers/firebaseAdmin'
import { withApiException } from '@/common/utils/withApiException'

function get(req: NextApiRequest, res: NextApiResponse) {
    const listsRef = db.collection('lists')

    try {
        listsRef.get().then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))

            return res.status(201).json(data)
        })
    } catch (error) {
        return res.status(500).json({ general: 'Something went wrong, please try again' })
    }
}

async function post(req: NextApiRequest, res: NextApiResponse) {
    const listsRef = db.collection('lists')

    const body = req.body.data as ListInput

    try {
        const response = await listsRef.add({ ...body, content: [] })

        const created: List = {
            ...body,
            content: [],
            id: response.id,
        }

        res.status(201).json(created)
    } catch (error) {
        return res.status(500).json({ general: 'Something went wrong, please try again' })
    }
}

function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') return get(req, res)
    if (req.method === 'POST') return post(req, res)

    throw new NotFoundException("Path doesn't exist")
}

export default withApiException(handler)
