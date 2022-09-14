import React from 'react'
import GradientHeader from '../components/GradientHeader'
import { Badge, Box, Button, Card, Group, Image, Text, Title, Container, SimpleGrid } from '@mantine/core';
import prisma from '../lib/prisma';
import ArtistCard from '../components/ArtistCard';

const Home = ({ artists }) => {

  console.log(artists)

  return (
    <Box>
      <GradientHeader />

      <Box mt={20}>
        <Title order={3}>Your Top Artists</Title>

        <Group mt={10}>
          {artists.map((artist) => (
            <ArtistCard name={artist.name} />
          ))}
        </Group>
      </Box>

    </Box>
  )
}

export const getServerSideProps = async () => {

  const artists = await prisma.artist.findMany({})
  console.log(artists)

  return {
    props: {
      // create serialisable object
      artists: JSON.parse(JSON.stringify(artists))
    }
  }

}

export default Home