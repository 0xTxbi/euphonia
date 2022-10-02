import useSWR from "swr"
import { fetcher } from "../lib/fetcher"

export const useUser = () => {

    const { data, error } = useSWR('/user', fetcher)

    return {
        user: data,
        userID: data?.id,
        isLoading: !data && !error,
        isError: error
    }

}

export default useUser