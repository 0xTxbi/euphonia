import prisma from "../../../lib/prisma";
import { validateRoute } from "../../../lib/auth";
import { NextApiRequest, NextApiResponse } from 'next';

export default validateRoute(async (req: NextApiRequest, res: NextApiResponse) => {

    const { newPlaylistName, userID } = req.body

    try {

        const newPlaylist = await prisma.playlist.create({
            data: {
                name: newPlaylistName,
                user: {
                    connect: {
                        id: userID
                    }
                }
            }
        })

        res.json(newPlaylist)

    } catch (error) {

        res.json({
            error: "Error encountered on playlist creation"
        })
        console.log(error)

    }

})