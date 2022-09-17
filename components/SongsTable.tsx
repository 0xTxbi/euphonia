import { Box, createStyles, Table } from '@mantine/core';
import { convertDuration, convertTime } from '../lib/converters';

const SongsTable = ({ songs }) => {

    const useStyles = createStyles((_params) => ({

        paddedContainer: {
            margin: '2rem 0 2rem 0'
        }

    }))

    const songsRow = []
    if (songs.length !== 0) {
        songs.map((songs) => {
            songsRow.push({ id: songs.id, name: songs.name, duration: convertDuration(songs.duration), dateAdded: convertTime(songs.updatedAt) })
        })
    }

    const { classes } = useStyles()

    return (

        <Box className={classes.paddedContainer}>
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
                        <tr key={song.id}>
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