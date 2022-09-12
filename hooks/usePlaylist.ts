import useSWR from "swr"
import { fetcher } from "../lib/fetcher"

export const usePlaylists = () => {

    const { data, error } = useSWR('/playlists', fetcher)

    return {
        playlists: (data as any) || [],
        isLoading: !data && !error,
        isError: error
    }

}

export default usePlaylists