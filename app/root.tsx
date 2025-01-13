import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useRouteError } from '@remix-run/react'

import { LinksFunction } from '@remix-run/node'
import { MuiDocument } from './components/mui/MuiDocument'
import { MuiMeta } from './components/mui/MuiMeta'
import { getMuiLinks } from './components/mui/links'

export const links: LinksFunction = () => [...getMuiLinks()]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <MuiMeta />
        <Links />
      </head>
      <body suppressHydrationWarning>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <>
      <MuiDocument>
        <Outlet />
      </MuiDocument>
    </>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>
          {isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : error instanceof Error ? error.message : 'Unknown Error'}
        </h1>
        <Scripts />
      </body>
    </html>
  )
}
