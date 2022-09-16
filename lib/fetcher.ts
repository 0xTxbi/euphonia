export const fetcher = (url: string, data = undefined) => {

    return fetch(`${window.location.origin}/api/${url}`, {
        method: data ? 'POST' : 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => {

        console.log(res.statusText)
        if (res.status > 399 || res.status < 200) {
            throw new Error(res.statusText)
        }

        return res.json()

    })

}