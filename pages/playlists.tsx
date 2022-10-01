import { Box, createStyles, SimpleGrid, Skeleton } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { PlaylistCard } from '../components/PlaylistCard';
import usePlaylists from '../hooks/usePlaylist';

const Playlists = () => {

    const useStyles = createStyles((_params) => ({

        paddedContainer: {
            margin: '1rem 1rem 1rem 1rem'
        },

        unstyledLink: {
            textDecoration: 'none'
        },

    }))

    const { classes } = useStyles()
    const { playlistsSummary } = usePlaylists()

    return (

        <Box className={classes.paddedContainer}>
            <SimpleGrid cols={4} spacing='xl'>

                {playlistsSummary.map((playlist) => (

                    <NextLink className={classes.unstyledLink} href={{
                        pathname: '/playlists/[id]',
                        query: { id: playlist.id }
                    }}>
                        <PlaylistCard name={playlist.name} numberOfSongs={playlist.songsLength} dateAdded={playlist.dateAdded} />
                    </NextLink>

                ))}

            </SimpleGrid>
        </Box>

    );

}

export default Playlists