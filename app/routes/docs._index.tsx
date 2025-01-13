import { Typography } from '@mui/material'
import Layout from '~/components/layouts/layouts'

export function HydrateFallback() {
  return <h1>Loading...</h1>
}

export default function TemporaryDrawer() {
  return (
    <Layout>
      <Typography variant="h1">Docs</Typography>
    </Layout>
  )
}
