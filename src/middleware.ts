import { AppRoutes, DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, privateRoutes } from '@/routes'
import { generatePrivateRoutesRegex } from '@/lib/utils'
import { auth } from '@/auth'

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const privateRoutesRegex = generatePrivateRoutesRegex(privateRoutes)
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPrivateRoute = privateRoutesRegex.test(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname as AppRoutes)

  if (isApiAuthRoute) {
    return
  }

  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
  }

  if (!isLoggedIn && isPrivateRoute) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) {
      callbackUrl += nextUrl.search
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    return Response.redirect(new URL(`${AppRoutes.LOGIN}?callbackUrl=${encodedCallbackUrl}`, nextUrl))
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
