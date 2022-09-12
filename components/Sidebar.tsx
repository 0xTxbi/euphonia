import { useState } from 'react';
import { createStyles, Navbar, Group, Code, Title, ScrollArea, Divider, Loader, LoadingOverlay } from '@mantine/core';
import {
    IconHome,
    IconBooks,
    IconFileMusic,
    IconPlus,
    IconPlaylistAdd,
    IconVinyl
} from '@tabler/icons';
import { LinksGroup } from './CollapsibleLinks';
import { usePlaylists } from '../hooks/usePlaylist';

const useStyles = createStyles((theme, _params, getRef) => ({
    navbar: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        paddingBottom: 0,
    },

    header: {
        padding: theme.spacing.md,
        paddingTop: 0,
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
    },

    links: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
    },

    linksInner: {
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
    },

    customScrollArea: {
        height: '100vh'
    },

    footer: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
    },
}))

const navLinks = [
    { link: '', label: 'Home', icon: IconHome },
    { link: '', label: 'Your Library', icon: IconBooks },
    { link: '', label: 'Create Playlist', icon: IconPlaylistAdd },
    { link: '', label: 'Playlists', icon: IconFileMusic }
];

const playListLinksRaw = []


const Sidebar = () => {

    const { classes } = useStyles();
    const { playlists, isLoading, isError } = usePlaylists()

    if (playlists.length !== 0) {
        playlists.map((playlist) => {
            playListLinksRaw.push({ id: playlist.id, link: '', label: playlist.name, icon: IconVinyl })
        })
    }

    const links = navLinks.map((link) => <LinksGroup {...link} key={link.label} />);
    const playlistLinks = playListLinksRaw.map((playlist) => <LinksGroup {...playlist} key={playlist.id} />)

    console.log(playlists, isError, isLoading)
    console.log(playListLinksRaw)

    return (
        <Navbar height="100%" width={{ sm: 300 }} p="md" className={classes.navbar}>
            <Navbar.Section className={classes.header}>
                <Group position="apart">
                    <Title order={1} size="h3">Euphonia</Title>
                    <Code sx={{ fontWeight: 700 }}>v0.0.1</Code>
                </Group>
            </Navbar.Section>

            <Navbar.Section grow className={classes.links} component={ScrollArea}>
                <div className={classes.linksInner}>{links}</div>
                <Divider />
                <ScrollArea className={classes.customScrollArea}>
                    {isLoading ? (
                        <div className={classes.linksInner}>
                            <LoadingOverlay visible />
                        </div>) : (
                        <div className={classes.linksInner}>{playlistLinks}</div>
                    )}
                </ScrollArea>

            </Navbar.Section>
        </Navbar>
    )
}

export default Sidebar