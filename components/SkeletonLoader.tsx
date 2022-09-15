import { Skeleton } from '@mantine/core'
import React from 'react'

const SkeletonLoader = ({ children, loading }) => {
    return (
        <Skeleton visible={loading}>
            {children}
        </Skeleton>
    )
}

export default SkeletonLoader