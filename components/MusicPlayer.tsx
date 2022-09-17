import { Paper, Text, Group, Footer, Box, Image, ActionIcon, Title } from '@mantine/core';
import {
    IconArrowsShuffle,
    IconPlayerPause,
    IconPlayerSkipBack,
    IconPlayerSkipForward,
    IconRepeat,
} from '@tabler/icons';


const MusicPlayer = () => {
    return (
        <Footer height='auto'>
            <Paper p="lg" shadow="md">
                <Group position="apart" mb="xs">
                    <Box>
                        <Title order={4} weight={500}>
                            Flashing Lights
                        </Title>
                        <Text size="xs" weight={500}>
                            Kanye West
                        </Text>
                    </Box>

                    <Group>
                        <ActionIcon>
                            <IconArrowsShuffle size={12} />
                        </ActionIcon>
                        <ActionIcon>
                            <IconPlayerSkipBack size={15} />
                        </ActionIcon>
                        <ActionIcon>
                            <IconPlayerPause size={25} />
                        </ActionIcon>
                        <ActionIcon>
                            <IconPlayerSkipForward size={15} />
                        </ActionIcon>
                        <ActionIcon>
                            <IconRepeat size={12} />
                        </ActionIcon>
                    </Group>

                    <Box sx={{
                        marginTop: '-10rem'
                    }}>
                        <Image src='https://images.genius.com/48bb3318d8ae27f31eba3f1db412d15d.752x752x1.jpg' radius='md' withPlaceholder height={200} width={200} />
                    </Box>
                </Group>
            </Paper>
        </Footer >
    )
}

export default MusicPlayer