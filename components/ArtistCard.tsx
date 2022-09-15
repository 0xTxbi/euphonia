import { Badge, Box, Button, Card, createStyles, Group, Image, Text } from '@mantine/core'
import React from 'react'

const ArtistCard = ({ name, image }) => {

    return (
        <Box sx={{
            width: '200px',
            height: '200px'
        }}>
            <Card shadow="sm" p="lg" radius="md">
                <Image
                    radius={100}
                    src={image}
                    height={160}
                    alt="Norway"
                />
                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>{name}</Text>
                    <Badge color="blue" variant="light">
                        Artist
                    </Badge>
                </Group>

                <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                    View
                </Button>
            </Card>
        </Box>
    )
}

export default ArtistCard