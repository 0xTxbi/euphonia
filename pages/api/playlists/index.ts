import prisma from "../../../lib/prisma";
import { validateRoute } from "../../../lib/auth";

export default validateRoute(async (req, res, user) => {

    const playlists = await prisma.playlist.findMany({
        where: {
        },
        include: {
            songs: {
            }
        },
        orderBy: {
            name: 'asc'
        }
    })

    res.json(playlists)

})