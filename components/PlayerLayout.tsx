import React from 'react'
import Sidebar from './Sidebar'

const PlayerLayout = ({ children }) => {
    return (
        <div className='w-screen h-screen'>
            <div className='flex h-5/6'>
                <div className='w-1/3'>
                    <Sidebar />
                </div>
                <div className='w-2/3'>
                    {children}
                </div>
            </div>
            <div className='h-1/6'>
                app player
            </div>
        </div>
    )
}

export default PlayerLayout