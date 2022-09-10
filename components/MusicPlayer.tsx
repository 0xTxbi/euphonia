import { Paper, Text, Group, Footer } from '@mantine/core';


const MusicPlayer = () => {
    return (
        <Footer height={'auto'}>
            <Paper p="lg" shadow="md" >
                <Group position="apart" mb="xs">
                    <Text size="md" weight={500}>
                        Music Player
                    </Text>
                </Group>
            </Paper>
        </Footer >
    )
}

export default MusicPlayer