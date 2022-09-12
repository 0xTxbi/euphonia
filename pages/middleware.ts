import { NextResponse, NextRequest } from 'next/server';

const authenticatedPages = ['/', '/playlist', 'library']

export const middleware = (req: NextRequest) => {

    if (authenticatedPages.find((page) => page === req.nextUrl.pathname)) {

        const token = req.cookies.EUPHORIA_ACCESS_TOKEN

        // Redirect to login page if unauthorised
        if (!token) {
            return NextResponse.redirect('/login')
        }

    }

}