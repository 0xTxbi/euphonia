import { Box, createStyles, SimpleGrid } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { useState } from 'react';
import AddPlayListCard from '../components/AddPlayListCard';
import { PlaylistCard } from '../components/PlaylistCard';
import usePlaylists from '../hooks/usePlaylist';

const Playlists = () => {

    const [modalOpen, setModalOpen] = useState(false)
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

                <AddPlayListCard />

                {playlistsSummary.map((playlist) => (

                    <NextLink className={classes.unstyledLink} href={{
                        pathname: '/playlists/[id]',
                        query: { id: playlist.id }
                    }}>
                        <PlaylistCard
                            id={playlist.id}
                            image='https://images.unsplash.com/photo-1660659236367-710aa4ae7e19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                            name={playlist.name}
                            numberOfSongs={playlist.songsLength}
                            dateAdded={playlist.dateAdded}
                        />
                    </NextLink>

                ))}

            </SimpleGrid>
        </Box>

    );

}

export default Playlists