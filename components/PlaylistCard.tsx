import { IconHistory } from '@tabler/icons';
import { Card, Text, Group, Center, createStyles } from '@mantine/core';
import { NextLink } from '@mantine/next';

const useStyles = createStyles((theme, _params, getRef) => {
    const image = getRef('image');

    return {
        card: {
            position: 'relative',
            height: 250,
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],

            [`&:hover .${image}`]: {
                transform: 'scale(1.03)',
            },
        },

        image: {
            ref: image,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundSize: 'cover',
            transition: 'transform 500ms ease',
        },

        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient( 83.2deg,  rgba(150,93,233,1) 10.8%, rgba(99,88,238,1) 94.3% )',
        },

        content: {
            height: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            zIndex: 1,
        },

        name: {
            color: theme.white,
            marginBottom: 5,
        },

        bodyText: {
            color: theme.white,
            marginLeft: 7,
        },

        numberOfSongs: {
            color: theme.white
        }
    };
});

interface PlaylistCardProps {
    id: number;
    image: string;
    name: string;
    numberOfSongs: string;
    dateAdded: number;
}

export function PlaylistCard({ id, image, name, numberOfSongs, dateAdded }: PlaylistCardProps) {
    const { classes, theme } = useStyles();

    return (
        <Card
            p="lg"
            shadow="lg"
            className={classes.card}
            radius="md"
            component="a"
            target="_blank"
        >
            <div className={classes.image} style={{ backgroundImage: `url(${image})` }} />
            <div className={classes.overlay} />

            <div className={classes.content}>
                <div>
                    <Text size="lg" className={classes.name} weight={500}>
                        {name}
                    </Text>

                    <Group position="apart" spacing="xs">
                        <Text size="sm" className={classes.numberOfSongs}>
                            {`${numberOfSongs} songs`}
                        </Text>

                        <Group spacing="lg">
                            <Center>
                            </Center>
                            <Center>
                                <IconHistory size={16} stroke={1.5} color={theme.white} />
                                <Text size="sm" className={classes.bodyText}>
                                    {dateAdded}
                                </Text>
                            </Center>
                        </Group>
                    </Group>
                </div>
            </div>
        </Card>
    );
}