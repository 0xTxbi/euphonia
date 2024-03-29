import {
    Paper,
    Text,
    Group,
    Footer,
    Box,
    Image,
    ActionIcon,
    Title,
    Stack,
    Slider,
    Container,
} from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import {
    IconArrowsShuffle,
    IconPlayerPlay,
    IconPlayerPause,
    IconPlayerSkipBack,
    IconPlayerSkipForward,
    IconRepeat,
} from '@tabler/icons';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { convertDuration } from '../lib/converters';
import ReactPlayer from 'react-player';


const MusicPlayer = () => {

    // Song queue state
    const songsToPlay = useStoreState((state: any) => state.currentSongs)
    const singleSongToPlay = useStoreState((state: any) => state.currentSong)

    const [isPlaying, setIsPlaying] = useState(false)
    const [songIndex, setSongIndex] = useState(songsToPlay.findIndex((song) => song.id === singleSongToPlay.id))
    const [seek, setSeek] = useState(0)
    const [isSeeking, setIsSeeking] = useState(false)
    const [repeat, setRepeat] = useState(false)
    const [shuffle, setShuffle] = useState(false)
    const [songDuration, setSongDuration] = useState(0.00)
    const musicRef = useRef(null)
    const repeatFnRef = useRef(repeat)

    // Keep repeat reference and state in sync
    useEffect(() => {

        repeatFnRef.current = repeat

    }, [repeat])

    // Change play state
    const togglePlayState = () => {
        setIsPlaying(!isPlaying)

    }

    // play song
    const handlePlay = () => {
        setIsPlaying(true)
    }

    // pause song
    const handlePause = () => {
        setIsPlaying(false)
    };

    // trigger when slider is being dragged
    const handleSeekMouseDown = () => {
        setIsSeeking(true)
    }

    // fire during slider drag
    const handleSeekChange = (e) => {
        setSeek(e)
        musicRef.current.seekTo(parseFloat(e), 'seconds')
    }

    // trigger when slider drag ends
    const handleSeekMouseUp = (e) => {
        setIsSeeking(false)
        musicRef.current.seekTo(parseFloat(e))
    }

    // sync slider progress
    const handleProgress = (state) => {
        if (!isSeeking) {
            setSeek(state.playedSeconds)
        }
    }

    // Event when song loads
    const onMusicLoad = () => {
        const musicDuration = musicRef.current.getDuration()
        setSongDuration(musicDuration)
    }

    // Event when song ends
    const onMusicEnd = () => {
        // first check if repeat is enabled
        if (repeatFnRef.current) {
            setIsPlaying(true)
        } else {
            nextSong()
        }
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

    return (
        <Footer height='10vh'>
            <Paper p="lg" shadow="md">

                <ReactPlayer
                    ref={musicRef}
                    url={singleSongToPlay?.url}
                    onReady={onMusicLoad}
                    loop={repeat}
                    controls={false}
                    playing={isPlaying}
                    style={{
                        display: 'none'
                    }}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    onEnded={onMusicEnd}
                    onProgress={handleProgress}
                />

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
                                    <ActionIcon>
                                        <IconPlayerSkipBack size={15} />
                                    </ActionIcon>
                                    {isPlaying ? (
                                        <ActionIcon onClick={() => togglePlayState()}>
                                            <IconPlayerPause size={25} />
                                        </ActionIcon>
                                    ) : (
                                        <ActionIcon onClick={() => togglePlayState()}>
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

                            <Slider
                                min={0} max={songDuration}
                                label={null}
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
                                onChange={(e) => {
                                    handleSeekChange(e)
                                }}
                                onMouseDown={handleSeekMouseDown}
                                onMouseUp={handleSeekMouseUp}
                            />
                        </Stack>
                        <Group position='apart'>
                            <Text size='xs'>{convertDuration(seek)}</Text>
                            <Text size='xs'>{convertDuration(songDuration)}</Text>
                        </Group>
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