import { fetcher } from "./fetcher";

export const auth = (mode: 'register' | 'login', body: { name: string, email: string, password: string } | { email: string, password: string }) => {

    return fetcher(`/${mode}`, body)

}

export const managePlaylist = (mode: 'playlists/new' | 'playlists/update', body: { newPlaylistName: string, userID: string }) => {

    return fetcher(`/${mode}`, body)

}