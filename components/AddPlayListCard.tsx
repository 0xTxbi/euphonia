import { Button, Center, createStyles, Modal, TextInput, Group } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { useState } from 'react';


const AddPlayListCard = () => {

    // modal state
    const [modalOpen, setModalOpen] = useState(false)

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
                opened={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Create a Playlist"
            >
                <form>
                    <TextInput
                        placeholder="my awesome playlist"
                    />


                    <Group position="right" mt="lg">
                        <Button type="submit">Create Playlist</Button>
                    </Group>
                </form>
            </Modal>

        </>
    )

}

export default AddPlayListCard