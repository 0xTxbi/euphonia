import { Paper, Text, Group, Footer, Box, Image, ActionIcon, Title, Stack, Slider, Container, Center } from '@mantine/core';
import { useRef, useState } from 'react';
import {
    IconArrowsShuffle,
    IconPlayerPlay,
    IconPlayerPause,
    IconPlayerSkipBack,
    IconPlayerSkipForward,
    IconRepeat,
} from '@tabler/icons';
import { useStoreState } from 'easy-peasy';
import ReactHowler from 'react-howler';


const MusicPlayer = ({ songs }) => {

    // Song queue state
    const songsToPlay = useStoreState((state: any) => state.currentSongs)
    const singleSongToPlay = useStoreState((state: any) => state.currentSong)

    const [isPlaying, setIsPlaying] = useState(false)
    const [songindex, setSongIndex] = useState(0)
    const [seek, setSeek] = useState(0)
    const [isSeeking, setIsSeeking] = useState(false)
    const [repeat, setRepeat] = useState(false)
    const [shuffle, setShuffle] = useState(false)
    const [songDuration, setSongDuration] = useState(0.00)
    const musicRef = useRef(null)

    // Event when song loads
    const onMusicLoad = () => {

        const musicDuration = musicRef.current.duration()
        setSongDuration(musicDuration)

    }

    // Event when song ends
    const onMusicEnd = () => {

        // first check if song repeat is enabled
        if (repeat) {
            // reset player progress back to 0
            setSeek(0)
            musicRef.current.seek(0)
        } else {
            nextSong()
        }

    }

    // Change play state
    const modifyPlayState = (playState) => {

        setIsPlaying(playState)

    }

    // Event when seek bar is modified/dragged
    const onPlayerSeek = (e) => {

        setSeek(parseFloat(e))
        musicRef.current.seek(e)

    }

    // Enable/Disable shuffle
    const modifyShuffleState = () => {

        setShuffle((shuffleState) => !shuffleState)

    }

    // Enable/disable repeat
    const modifyRepeatState = () => {

        setRepeat((repeatState) => !repeatState)

    }

    // Previous song
    const prevSong = () => {

        setSongIndex((state) => {
            return state ? state - 1 : songsToPlay.length - 1
        })

    }

    // Next song
    const nextSong = () => {

        setSongIndex((state: any) => {
            // first check if shuffle is enabled
            if (shuffle) {

                // shuffle algorithm
                const nextQueue = Math.floor(Math.random() * songsToPlay.length)
                if (nextQueue === state) {
                    return nextSong()
                }

            } else {
                return state === songsToPlay.length - 1 ? 0 : state + 1
            }
        })

    }

    console.log(seek)

    return (
        <Footer height='auto'>
            <Paper p="lg" shadow="md">
                {singleSongToPlay !== null ? (
                    <ReactHowler
                        ref={musicRef}
                        onLoad={onMusicLoad}
                        onEnd={onMusicEnd}
                        src={singleSongToPlay?.url}
                        playing={isPlaying}
                    />
                ) : (
                    null
                )}
                <Group position="apart" mb="xs">
                    <Box>
                        <Title order={4} weight={500}>
                            {singleSongToPlay?.name}
                        </Title>
                        <Text size="xs" weight={500}>
                            {singleSongToPlay?.artist}
                        </Text>
                    </Box>

                    <Container sx={{
                        width: '70%'
                    }}>
                        <Stack spacing='sm'>

                            <Container>
                                <Group>
                                    <ActionIcon color={shuffle ? 'gray.0' : 'gray.7'} onClick={modifyShuffleState}>
                                        <IconArrowsShuffle size={12} />
                                    </ActionIcon>
                                    <ActionIcon onClick={prevSong}>
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
                                    <ActionIcon onClick={nextSong}>
                                        <IconPlayerSkipForward size={15} />
                                    </ActionIcon>
                                    <ActionIcon color={repeat ? 'gray.0' : 'gray.7'} onClick={modifyRepeatState}>
                                        <IconRepeat size={12} />
                                    </ActionIcon>
                                </Group>
                            </Container>

                            <Slider label={null} min={0}
                                max={songDuration ? songDuration.toFixed(2) : 0}
                                value={seek}
                                styles={(theme) => ({
                                    thumb: {
                                        height: 16,
                                        width: 16,
                                        backgroundColor: theme.white,
                                        borderWidth: 1,
                                        boxShadow: theme.shadows.sm,
                                    },
                                })}

                                onChange={onPlayerSeek}
                            />
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