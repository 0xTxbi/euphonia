import { Box, createStyles, Group, Image, Stack, Text, Title } from '@mantine/core';

const PlaylistGradientHeader = ({ name, color, stats }) => {

    const useStyles = createStyles((theme, _params) => ({
        header: {
            background: `${color}`,
            borderRadius: theme.radius.md,
            display: 'flex',
            height: '30vh',
            padding: theme.spacing.lg,
            cursor: 'pointer',
        },

        userAvatar: {
            borderRadius: '50%',
        },

        alignEnd: {
            alignSelf: 'end'
        }
    }))

    const { classes } = useStyles()

    return (

        <Box className={classes.header}>
            <Group className={classes.alignEnd}>
                <Image height={200} width={200} radius='md' withPlaceholder />
                <Stack>
                    <Title color='white'>{name}</Title>
                    <Text size='md' color='white'>{stats} songs</Text>
                </Stack>
            </Group>
        </Box>


    )

}

export default PlaylistGradientHeader