import { ActionIcon, Box, createStyles, Table } from '@mantine/core';
import { IconPlayerPlay } from '@tabler/icons';
import { useStoreActions } from 'easy-peasy';
import { convertDuration, convertTime } from '../lib/converters';

const SongsTable = ({ songs, color }) => {

    const queueAllPlaylistSongs = useStoreActions((store: any) => store.changeCurrentSongs)
    const queueSingleSong = useStoreActions((store: any) => store.changeCurrentSong)

    const handleQueue = (activeSong?) => {

        queueSingleSong(activeSong || songs[0])
        queueAllPlaylistSongs(songs)

    }

    const useStyles = createStyles((_params) => ({

        paddedContainer: {
            margin: '2rem 0 2rem 0'
        }

    }))

    const songsRow = []
    if (songs.length !== 0) {
        songs.map((songs) => {
            songsRow.push({
                id: songs.id,
                url: songs.url,
                name: songs.name,
                artist: songs.artist.name,
                duration: convertDuration(songs.duration),
                dateAdded: convertTime(songs.updatedAt)
            })
        })
    }

    const { classes } = useStyles()

    return (

        <Box className={classes.paddedContainer}>
            <ActionIcon variant='filled' sx={{ borderRadius: '100%', background: `${color}` }} onClick={handleQueue}>
                <IconPlayerPlay size={16} />
            </ActionIcon>
            <Table verticalSpacing='md' horizontalSpacing='md' striped highlightOnHover>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Duration</th>
                        <th>Date Added</th>
                    </tr>
                </thead>
                <tbody>
                    {songsRow.map((song) => (
                        <tr key={song.id} onClick={() => handleQueue(song)} >
                            <td>
                                #{song.id}
                            </td>
                            <td>{song.name}</td>
                            <td>{song.duration}</td>
                            <td>{song.dateAdded}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Box>

    )

}

export default SongsTable