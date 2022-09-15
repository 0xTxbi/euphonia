import jwt from 'jsonwebtoken'
import prisma from './prisma'
import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export const validateRoute = (handler) => {

    return async (req: NextApiRequest, res: NextApiResponse) => {

        const token = req.cookies.EUPHONIA_ACCESS_TOKEN

        if (token) {
            let user

            try {

                const { id } = jwt.verify(token, 'euphonia-dev')
                user = await prisma.user.findUnique({
                    where: { id }
                })

                if (!user) {

                    throw new Error('Not registered user')

                }

            } catch (error) {

                res.status(401)
                res.json({ error: 'Authorisation failed. Access denied' })
                return

            }
            return handler(req, res, user)
        }

        res.status(401)
        res.json({ error: 'Authorisation failed. Access denied' })

    }

}

// Validate token
export const validateToken = (token) => {

    const user = jwt.verify(token, 'euphonia-dev')
    return user

}