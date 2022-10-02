import { Button, Center, createStyles, Modal, TextInput, Group } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { useState } from 'react';
import prisma from '../lib/prisma';
import useUser from '../hooks/useUser';
import { managePlaylist } from '../lib/mutations';
import usePlaylists from '../hooks/usePlaylist';


const AddPlayListCard = () => {

    // modal state
    const [modalOpen, setModalOpen] = useState(false)
    // form input state
    const [newPlaylistName, setNewPlaylistName] = useState('')
    // form loading state
    const [isLoading, setIsLoading] = useState(false)

    const useStyles = createStyles((theme, _params) => ({

        cardContainer: {
            background: `${theme.colors.gray[8]}`,
            borderRadius: `5px`,
            cursor: 'pointer',

            '&:hover': {
                background: `${theme.colors.gray[9]}`,
            },
        }

    }))

    const { userID } = useUser()
    console.log(userID)

    // create playlist form handler
    const handleCreatePlaylist = async (e) => {

        e.preventDefault()
        setIsLoading(true)
        setNewPlaylistName('')
        const newPlaylist = await managePlaylist('playlists/new', { newPlaylistName, userID })
        setIsLoading(false)

    }

    const { classes } = useStyles()


    return (
        <>

            <Center
                className={classes.cardContainer}
                onClick={() => setModalOpen(true)}
            >
                <IconPlus size={50} />
            </Center>

            {/* create playlist modal */}
            <Modal
                centered
                size='xl'
                withCloseButton={false}
                transition="fade"
                transitionDuration={600}
                transitionTimingFunction="ease-in"
                opened={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Create a Playlist"
            >
                <form onSubmit={handleCreatePlaylist}>
                    <TextInput
                        placeholder="my awesome playlist"
                        required
                        value={newPlaylistName}
                        onChange={(e) => setNewPlaylistName(e.target.value)}
                    />


                    <Group position="right" mt="lg">
                        <Button
                            type="submit"
                            leftIcon={<IconPlus />}
                            loading={isLoading}
                        >
                            Create Playlist
                        </Button>
                    </Group>
                </form>
            </Modal>

        </>
    )

}

export default AddPlayListCard