import { ActionIcon, Box, createStyles, Table } from '@mantine/core';
import { IconPlayerPlay } from '@tabler/icons';
import { useStoreActions } from 'easy-peasy';
import { convertDuration, convertTime } from '../lib/converters';

const SongsTable = ({ songs, color }) => {

    const queueAllPlaylistSongs = useStoreActions((store: any) => store.changeCurrentSongs)
    const queueSingleSong = useStoreActions((store: any) => store.changeCurrentSong)
    // const [queue, setQueue] = useState([])

    let songsRow = []
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

    const addSingleToQueue = (activeSong) => {
        queueSingleSong(activeSong)
    }

    const addMultipleToQueue = () => {
        let queueStore = []
        songsRow.map((song) => queueStore.push(song.url))
        // setQueue([...queue, queueStore])
        queueAllPlaylistSongs(songsRow)
        queueSingleSong(songsRow[0])
    }


    const useStyles = createStyles((_params) => ({

        paddedContainer: {
            margin: '2rem 0 2rem 0'
        }

    }))

    const { classes } = useStyles()

    return (

        <Box className={classes.paddedContainer}>
            <ActionIcon variant='filled' sx={{ borderRadius: '100%', background: `${color}` }} onClick={addMultipleToQueue}>
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
                        <tr key={song.id} onClick={() => addSingleToQueue(song?.url)} >
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