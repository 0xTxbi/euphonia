import React from 'react'
import Sidebar from './Sidebar'
import { AppShell, Box } from '@mantine/core'
import Footer from './MusicPlayer'

const PlayerLayout = ({ children }) => {

    return (

        <AppShell
            navbarOffsetBreakpoint='sm'
            navbar={<Sidebar />}
            footer={<Footer />}
        >
            <Box sx={{
                height: '88vh',
                overflow: 'scroll'
            }}>
                {children}
            </Box>
        </AppShell>

    )

}

export default PlayerLayout