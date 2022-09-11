import {fetcher} from "./fetcher";

export const auth = (mode: 'register' | 'login', body: {name: string, email: string, password: string}) => {

    return fetcher(`/${mode}`, body)

} 