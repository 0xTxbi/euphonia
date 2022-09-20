import { Paper, Text, Group, Footer, Box, Image, ActionIcon, Title, Stack, Slider, Container } from '@mantine/core';
import { useState } from 'react';
import {
    IconArrowsShuffle,
    IconPlayerPlay,
    IconPlayerPause,
    IconPlayerSkipBack,
    IconPlayerSkipForward,
    IconRepeat,
} from '@tabler/icons';
import ReactHowler from 'react-howler'


const MusicPlayer = ({ songs, currentSong }) => {

    const [isPlaying, setIsPlaying] = useState(true)
    const [songindex, setSongIndex] = useState(0)
    const [seek, setSeek] = useState(0)
    const [repeat, setRepeat] = useState(false)
    const [shuffle, setShuffle] = useState(false)
    const [songDuration, setSongDuration] = useState(0.0)

    // Change play state
    const modifyPlayState = (playState) => {
        setIsPlaying(playState)
    }

    // Enable/Disable shuffle
    const modifyShuffleState = () => {
        setShuffle((shuffleState) => !shuffleState)
    }

    // Enable/disable repeat
    const modifyRepeatState = () => {
        setRepeat((repeatState) => !repeatState)
    }

    return (
        <Footer height='auto'>
            <Paper p="lg" shadow="md">
                {/* <ReactHowler
                    playing={isPlaying}
                    src={currentSong?.url}
                /> */}
                <Group position="apart" mb="xs">
                    <Box>
                        <Title order={4} weight={500}>
                            Flashing Lights
                        </Title>
                        <Text size="xs" weight={500}>
                            Kanye West
                        </Text>
                    </Box>

                    <Container sx={{
                        width: '50%'
                    }}>
                        <Stack spacing='sm'>

                            <Container>
                                <Group>
                                    <ActionIcon color={shuffle ? 'gray.0' : 'gray.7'} onClick={modifyShuffleState}>
                                        <IconArrowsShuffle size={12} />
                                    </ActionIcon>
                                    <ActionIcon>
                                        <IconPlayerSkipBack size={15} />
                                    </ActionIcon>
                                    {isPlaying ? (
                                        <ActionIcon onClick={() => modifyPlayState(false)}>
                                            <IconPlayerPause size={25} />
                                        </ActionIcon>
                                    ) : (
                                        <ActionIcon onClick={() => modifyPlayState(true)}>
                                            <IconPlayerPlay size={25} />
                                        </ActionIcon>
                                    )}
                                    <ActionIcon>
                                        <IconPlayerSkipForward size={15} />
                                    </ActionIcon>
                                    <ActionIcon color={repeat ? 'gray.0' : 'gray.7'} onClick={modifyRepeatState}>
                                        <IconRepeat size={12} />
                                    </ActionIcon>
                                </Group>
                            </Container>

                            <Slider label={null} min={0} max={100} styles={(theme) => ({
                                thumb: {
                                    height: 16,
                                    width: 16,
                                    backgroundColor: theme.white,
                                    borderWidth: 1,
                                    boxShadow: theme.shadows.sm,
                                },
                            })} />
                        </Stack>
                    </Container>

                    <Box sx={{
                        marginTop: '-10rem'
                    }}>
                        <Image
                            src='https://images.genius.com/48bb3318d8ae27f31eba3f1db412d15d.752x752x1.jpg'
                            radius='md'
                            withPlaceholder
                            height={200}
                            width={200}
                        />
                    </Box>
                </Group>
            </Paper >
        </Footer >
    )
}

export default MusicPlayer