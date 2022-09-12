import { NextResponse } from 'next/server';

const authenticatedPages = ['/', '/playlist', 'library']

export const middleware = (req) => {

    if (authenticatedPages.find((page) => page === req.nextUrl.pathname)) {

        const token = req.cookies.EUPHORIA_ACCESS_TOKEN

        // Redirect to login page if unauthorised
        if (!token) {
            const url = req.nextUrl.clone()
            url.pathname = '/login'
            return NextResponse.redirect(url)
        }

    }

}