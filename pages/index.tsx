import GradientHeader from '../components/GradientHeader'
import { Box, Group, Skeleton, Title } from '@mantine/core';
import prisma from '../lib/prisma';
import ArtistCard from '../components/ArtistCard';
import useUser from '../hooks/useUser';
import SkeletonLoader from '../components/SkeletonLoader';

const Home = ({ artists }) => {

  const { user, isLoading } = useUser()

  return (
    <Box>
      <SkeletonLoader loading={isLoading}>
        <GradientHeader name={user?.name} />
      </SkeletonLoader>

      <Box mt={20}>
        <Title order={3}>Your Top Artists</Title>

        <Group mt={10} spacing='md'>
          {artists.map((artist) => (
            <ArtistCard name={artist?.name} image={artist?.image} key={artist?.id} />
          ))}
        </Group>
      </Box>


    </Box>
  )
}

export const getServerSideProps = async () => {

  const artists = await prisma.artist.findMany({})

  return {
    props: {
      // create serialisable object
      artists: JSON.parse(JSON.stringify(artists))
    }
  }

}

export default Home