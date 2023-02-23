import { Fields, Files, IncomingForm } from 'formidable'
import { NextApiRequest, NextApiResponse } from 'next'

import { BadRequestException, NotFoundException } from '@/common/exceptions'
import { List } from '@/common/models/list'
import { db, storage } from '@/common/providers/firebase'
import { withApiException } from '@/common/utils/withApiException'

export const config = {
    api: {
        bodyParser: false,
    },
}

const formParse = (req: NextApiRequest): Promise<{ fields: Fields; files: Files }> =>
    new Promise((resolve, reject) => {
        const form = new IncomingForm()

        form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            resolve({ fields, files })
        })
    })

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

    const { fields, files } = await formParse(req)

    const file = files.file
    if (Array.isArray(file)) throw new BadRequestException('Multiple files are not supported')
    const fileExtention = file.originalFilename?.split('.').pop()
    if (!fileExtention) throw new BadRequestException('File not supported')
    if (!file.mimetype) throw new BadRequestException('File type not supported')

    const uploadResponse = await storage.upload(file.filepath, {
        contentType: file.mimetype,
        public: true,
        destination: `${Date.now()}.${fileExtention}`,
    })

    const data = {
        image: uploadResponse[0].publicUrl(),
        description: String(fields.description),
        maxSize: Number(fields.maxSize),
        name: String(fields.name),
        content: [],
    }

    const response = await listsRef.add(data)

    const created: List = {
        ...data,
        id: response.id,
    }

    res.status(201).json(created)
}

function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') return get(req, res)
    if (req.method === 'POST') return post(req, res)

    throw new NotFoundException("Path doesn't exist")
}

export default withApiException(handler)
