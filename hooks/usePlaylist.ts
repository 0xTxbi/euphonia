import { IconVinyl } from "@tabler/icons"
import useSWR from "swr"
import { fetcher } from "../lib/fetcher"

export const usePlaylists = () => {

    const { data, error } = useSWR('/playlists', fetcher)
    const playlistsRaw = []

    if (data?.length !== 0) {
        data?.map((playlist) => {
            playlistsRaw.push({ id: playlist.id, link: '', label: playlist.name, icon: IconVinyl })
        })
    }

    return {
        playlists: (playlistsRaw as any) || [],
        isLoading: !data && !error,
        isError: error
    }

}

export default usePlaylists