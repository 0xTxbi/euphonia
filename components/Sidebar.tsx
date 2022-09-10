import { useState } from 'react';
import { createStyles, Navbar, Group, Code, Title, ScrollArea } from '@mantine/core';
import {
    IconHome,
    IconBooks,
    IconFileMusic,
    IconPlus
} from '@tabler/icons';
import { LinksGroup } from './CollapsibleLinks';

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
    { link: '', label: 'Create Playlist', icon: IconPlus },
    {
        link: '', label: 'Playlists', icon: IconFileMusic, links: [
            { label: 'Playlist 1', link: '/' },
            { label: 'Playlist 2', link: '/' },
            { label: 'Playlist 3', link: '/' },
            { label: 'Playlist 4', link: '/' },
        ],
    },
];


const Sidebar = () => {

    const { classes } = useStyles();
    const links = navLinks.map((item) => <LinksGroup {...item} key={item.label} />);

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
            </Navbar.Section>
        </Navbar>
    )
}

export default Sidebar