import { IconVinyl } from "@tabler/icons"
import useSWR from "swr"
import { fetcher } from "../lib/fetcher"
import { convertTime } from '../lib/converters';

export const usePlaylists = () => {

    const { data, error } = useSWR('/playlists', fetcher)
    const playlistsRaw = []
    const playlistsSummaryRaw = []

    if (data?.length !== 0) {

        data?.map((playlist) => {

            playlistsRaw.push({ id: playlist.id, link: '', label: playlist.name, icon: IconVinyl })
            playlistsSummaryRaw.push({ id: playlist.id, name: playlist.name, songsLength: playlist.songs.length, dateAdded: convertTime(playlist.createdAt), dateUpdated: convertTime(playlist.updatedAt) })

        })

    }

    return {
        playlists: (playlistsRaw as any) || [],
        playlistsSummary: (playlistsSummaryRaw as any) || [],
        isLoading: !data && !error,
        isError: error
    }

}

export default usePlaylists