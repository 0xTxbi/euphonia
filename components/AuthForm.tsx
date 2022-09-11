import {FC, useState} from 'react';
import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
} from '@mantine/core';
import {useRouter} from 'next/router';
import {auth} from '../lib/mutations';
import Link from 'next/link';

const AuthForm: FC<{mode: 'register' | 'login'}> = ({mode}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const useStyles = createStyles((theme) => ({
        wrapper: {
            minHeight: '100vh',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundImage:
                'url(https://images.unsplash.com/photo-1578393098337-5594cce112da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=917&q=80)',
        },

        form: {
            borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
                }`,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: '40vw',
            paddingTop: 80,
            paddingRight: '3rem',
            paddingLeft: '3rem',

            [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                maxWidth: '100%',
            },
        },

        title: {
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        },

        logo: {
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            width: 120,
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    }));

    const {classes} = useStyles();

    const handleRegisterSubmit = async (e) => {

        e.preventDefault()
        setIsLoading(true)

        const user = await auth(mode, {name, email, password})
        setIsLoading(false)
        router.push('/')

    }

    const handleLoginSubmit = async (e) => {

        e.preventDefault()
        setIsLoading(true)

        const user = await auth(mode, {email, password})
        setIsLoading(false)
        router.push('/')

    }

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
                    Welcome to Euphonia
                </Title>

                {mode === 'register' ? (
                    <form onSubmit={handleRegisterSubmit}>
                        <TextInput label="Name" placeholder='Kanye West' size='md' onChange={(event) => setName(event.currentTarget.value)} />
                        <TextInput label="Email address" placeholder="hello@gmail.com" mt='md' size="md" onChange={(event) => setEmail(event.currentTarget.value)} />
                        <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" onChange={(event) => setPassword(event.currentTarget.value)} />

                        <Button type='submit' fullWidth mt="xl" size="md" loading={isLoading}>
                            Register
                        </Button>
                    </form>
                ) : (
                    <form onSubmit={handleLoginSubmit}>
                        <TextInput label="Email address" placeholder="hello@gmail.com" mt='md' size="md" onChange={(event) => setEmail(event.currentTarget.value)} />
                        <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" onChange={(event) => setPassword(event.currentTarget.value)} />

                        <Button type='submit' fullWidth mt="xl" size="md" loading={isLoading}>
                            Login
                        </Button>
                    </form>
                )}

            </Paper>
        </div>
    );

}

export default AuthForm