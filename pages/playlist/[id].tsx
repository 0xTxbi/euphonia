import React from 'react'
import PlaylistGradientHeader from '../../components/PlaylistGradientHeader';
import SongsTable from '../../components/SongsTable';
import { validateToken } from '../../lib/auth';
import prisma from '../../lib/prisma';

// Generate random playlist background
const generatePlaylistBG = (id) => {

    const bgColors = [
        'linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%);',
        'linear-gradient( 114.2deg,  rgba(121,194,243,1) 22.6%, rgba(255,180,239,1) 67.7% );',
        'linear-gradient( 109.6deg,  rgba(61,245,167,1) 11.2%, rgba(9,111,224,1) 91.1% );',
        'linear-gradient( 83.2deg,  rgba(150,93,233,1) 10.8%, rgba(99,88,238,1) 94.3% );',
        'linear-gradient( 64.5deg,  rgba(245,116,185,1) 14.7%, rgba(89,97,223,1) 88.7% );',
        'linear-gradient( 109.6deg,  rgba(62,161,219,1) 11.2%, rgba(93,52,236,1) 100.2% );',
        'linear-gradient( 67.2deg,  rgba(37,208,199,1) -7.5%, rgba(165,90,240,1) 62.7% );',
        'linear-gradient( 109.6deg,  rgba(48,207,208,1) 11.2%, rgba(51,8,103,1) 92.5% );',
        'linear-gradient( 110.9deg,  rgba(44,221,239,1) 1.1%, rgba(14,191,210,1) 37.6%, rgba(8,127,140,1) 99.2% );',
        'linear-gradient(to right, #ad5389, #3c1053);'
    ]

    return bgColors[id - 1] || bgColors[Math.floor(Math.random() * bgColors.length)]

}

const PlaylistSingleView = ({ playlistData }) => {

    const bgColor = generatePlaylistBG(playlistData?.id)

    return (
        <>
            <PlaylistGradientHeader
                name={playlistData?.name}
                color={bgColor}
                stats={playlistData?.songs?.length}
            />
            <SongsTable songs={playlistData?.songs} color={bgColor} />
        </>
    )

}

export const getServerSideProps = async ({ query, req }) => {

    let user

    try {

        user = validateToken(req.cookies.EUPHONIA_ACCESS_TOKEN)


    } catch (error) {

        // redirect to login
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            }
        }

    }

    const [playlistData] = await prisma.playlist.findMany({
        where: {
            // parse query id as a number (prepend with [+])
            id: +query.id,
            userId: user.id
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
            isLoading: !playlistData,
            // create serialisable object
            playlistData: JSON.parse(JSON.stringify(playlistData))
        }
    }

}

export default PlaylistSingleView