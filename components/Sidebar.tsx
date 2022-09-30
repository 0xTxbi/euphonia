import {
    createStyles,
    Navbar,
    Group,
    Code,
    Title,
    ScrollArea,
    Divider,
    LoadingOverlay,
    NavLink,
} from '@mantine/core';
import { IconHome, IconBooks, IconFileMusic, IconPlaylistAdd } from '@tabler/icons';
import { LinksGroup } from './CollapsibleLinks';
import { usePlaylists } from '../hooks/usePlaylist';
import { NextLink } from '@mantine/next';
import Link from 'next/link';

const useStyles = createStyles((theme, _params) => ({
    navbar: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        paddingBottom: 0,
    },

    unstyledLink: {
        textDecoration: 'none'
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

// const navLinks = [
//     { link: '/', label: 'Home', icon: IconHome },
//     { link: '', label: 'Your Library', icon: IconBooks },
//     { link: '', label: 'Create Playlist', icon: IconPlaylistAdd },
//     { link: '', label: 'Playlists', icon: IconFileMusic }
// ];




const Sidebar = () => {

    const { classes } = useStyles();
    const { playlists, isLoading } = usePlaylists()

    // const links = navLinks.map((link) => <LinksGroup {...link} key={link.label} />);
    const playlistLinks = playlists.map((playlist) => (

        <NextLink className={classes.unstyledLink} href={{
            pathname: '/playlists/[id]',
            query: { id: playlist.id }
        }}>
            <LinksGroup {...playlist} key={playlist.id} />
        </NextLink>

    ))

    return (
        <Navbar height="100%" width={{ sm: 300 }} p="md" className={classes.navbar}>
            <Navbar.Section className={classes.header}>
                <Group position="apart">
                    <Title order={1} size="h3">Euphonia</Title>
                    <Code sx={{ fontWeight: 700 }}>v0.0.1</Code>
                </Group>
            </Navbar.Section>

            <Navbar.Section grow className={classes.links} component={ScrollArea}>
                <div className={classes.linksInner}>
                    <Link href='/' passHref>
                        <NavLink
                            component='a'
                            label='Home'
                            icon={<IconHome size={16} stroke={1.5} />}
                        />
                    </Link>
                    <Link href='/library' passHref>
                        <NavLink
                            component='a'
                            label='Your Library'
                            icon={<IconHome size={16} stroke={1.5} />}
                        />
                    </Link>
                    <Link href='/playlists' passHref>
                        <NavLink
                            component='a'
                            label='Playlists'
                            icon={<IconHome size={16} stroke={1.5} />}
                        />
                    </Link>
                </div>
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