import { createStore, action } from "easy-peasy";

export const store = createStore({
    currentSongs: [],
    currentSong: null,
    changeCurrentSongs: action((state: any, payload) => {
        state.currentSongs = payload
    }),
    changeCurrentSong: action((state: any, payload) => {
        state.currentSong = payload
    })
})