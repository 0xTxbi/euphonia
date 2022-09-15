import React from 'react'
import Sidebar from './Sidebar'
import { AppShell } from '@mantine/core'
import Footer from './MusicPlayer'
import { useState } from 'react';

const PlayerLayout = ({ children }) => {

    return (

        <AppShell
            navbarOffsetBreakpoint='sm'
            navbar={<Sidebar />}
            footer={<Footer />}
        >
            {children}
        </AppShell>

    )

}

export default PlayerLayout