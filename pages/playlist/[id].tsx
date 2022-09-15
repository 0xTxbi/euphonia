import React from 'react'
import { validateToken } from '../../lib/auth';
import prisma from '../../lib/prisma';

const PlaylistSingleView = ({ playlistData }) => {

    console.log(playlistData)

    return (
        <div>{playlistData?.name}</div>
    )

}

export const getServerSideProps = async ({ query, req }) => {

    // Get signed in user's id
    const { id } = validateToken(req.cookies.EUPHONIA_ACCESS_TOKEN)
    const [playlistData] = await prisma.playlist.findMany({
        where: {
            // parse query id as a number (prepend with [+])
            id: +query.id,
            userId: id
        },
        include: {
            songs: {
                include: {
                    artist: {
                        select: {
                            name: true,
                            id: true
                        }
                    }
                }
            }
        }
    })

    return {
        props: {
            // create serialisable object
            playlistData: JSON.parse(JSON.stringify(playlistData))
        }
    }

}

export default PlaylistSingleView