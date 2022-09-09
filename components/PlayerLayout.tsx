import React from 'react'

const PlayerLayout = ({ children }) => {
    return (
        <div className='w-screen h-screen'>
            <div className='flex h-4/5'>
                <div className='w-1/3'>
                    app sidebar
                </div>
                <div className='w-2/3'>
                    app content
                </div>
            </div>
            <div className='h-1/5'>
                app player
            </div>
        </div>
    )
}

export default PlayerLayout