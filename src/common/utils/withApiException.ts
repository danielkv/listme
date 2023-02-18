import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { ApiError } from 'next/dist/server/api-utils'

import { apiErrorToPayload } from './apiErrorToPayload'
import { getErrorMessage } from './getErrorMessage'

export const withApiException =
    (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            return await Promise.resolve(handler(req, res))
        } catch (err) {
            if (err instanceof ApiError)
                return res.status(err.statusCode).json(apiErrorToPayload(err))

            res.status(500).json(apiErrorToPayload(new ApiError(500, getErrorMessage(err))))
        }
    }
