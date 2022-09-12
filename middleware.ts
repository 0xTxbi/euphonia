import { NextResponse, NextRequest } from 'next/server';

const authenticatedPages = ['/', '/playlist', 'library']

export const middleware = (req: NextRequest) => {

    if (authenticatedPages.find((page) => page === req.nextUrl.pathname)) {

        const token = req.cookies.has('EUPHONIA_ACCESS_TOKEN')

        // Redirect to login page if unauthorised
        if (!token) {
            const url = req.nextUrl.clone()
            url.pathname = '/login'
            return NextResponse.redirect(url)
        }

    }

}