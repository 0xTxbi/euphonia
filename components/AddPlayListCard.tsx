import { Button, Center, createStyles, Modal, TextInput, Group } from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck, IconPlus } from '@tabler/icons';
import { useState } from 'react';
import useUser from '../hooks/useUser';
import { managePlaylist } from '../lib/mutations';


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
    console.log(isLoading)

    // create playlist form handler
    const handleCreatePlaylist = async (e) => {

        e.preventDefault()
        setIsLoading(true)
        showNotification({
            id: 'load-data',
            loading: true,
            title: 'Creating playlist',
            message: `${newPlaylistName} is being created. Hang tight`,
            autoClose: false,
            disallowClose: true,
        });
        const newPlaylist = await managePlaylist('playlists/new', { newPlaylistName, userID })
        setNewPlaylistName('')
        setIsLoading(false)
        updateNotification({
            id: 'load-data',
            color: 'teal',
            title: 'Playlist created',
            message: `${newPlaylistName} has being created`,
            icon: <IconCheck size={16} />,
            autoClose: 5000,
        })
        setModalOpen(false)

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
                size='sm'
                withCloseButton={false}
                transition="fade"
                transitionDuration={500}
                transitionTimingFunction="ease-in-out"
                overlayOpacity={0.60}
                overlayBlur={3}
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
                        disabled={isLoading ? true : false}
                    />


                    <Group position="right" mt="lg">
                        <Button
                            type="submit"
                            leftIcon={<IconPlus size={20} />}
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