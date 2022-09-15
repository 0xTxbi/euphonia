import { Avatar, Box, Center, Container, createStyles, Group, Image, Stack, Text, Title } from '@mantine/core';

const GradientHeader = ({ name, color, image, title, subtitle, description }) => {

    const useStyles = createStyles((theme, _params) => ({
        header: {
            background: 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(37,145,251,0.98) 0.1%, rgba(0,7,128,1) 99.8% );',
            borderRadius: theme.radius.md,
            display: 'flex',
            height: '25vh',
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
                <Avatar className={classes.userAvatar} size={150} src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80' />
                <Stack>
                    <Title color='white'>hey, {name} 👋🏽</Title>
                    <Text size='md' color='white'>welcome to Euphonia.</Text>
                </Stack>
            </Group>
        </Box>


    )

}

export default GradientHeader