import { Button, Container, Stack } from '@mui/material'
import { LoaderFunction, MetaFunction } from '@remix-run/node'
import { getStrapiURL } from '~/utils/fetch-api'
import facebook from './Facebook_logo_(2023).svg'
import google from './google-logo.svg'

import { useLoaderData } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [{ title: 'เข้าสู่ระบบ' }]
}

export const loader: LoaderFunction = async () => {
  const googleUrl = getStrapiURL('/api/connect/google')
  const facebookUrl = getStrapiURL('/api/connect/facebook')
  return { googleUrl, facebookUrl }
}

const GoogleSignInButton = () => {
  const { googleUrl, facebookUrl } = useLoaderData<typeof loader>()
  return (
    <Container maxWidth="xs" sx={{ height: '100vh' }}>
      <Stack spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Button
          variant="outlined"
          color="primary"
          href={googleUrl}
          fullWidth={true}
          sx={{ height: '4em' }}
          startIcon={<img src={google} alt="Google Logo" height={30} />}
        >
          เข้าสู่ระบบด้วย Google Account
        </Button>
        <Button
          variant="outlined"
          color="primary"
          fullWidth={true}
          sx={{ height: '4em' }}
          href={facebookUrl}
          startIcon={<img src={facebook} alt="Facebook Logo" height={20} />}
        >
          เข้าสู่ระบบด้วย Facebook Account
        </Button>
      </Stack>
    </Container>
  )
}

export default GoogleSignInButton
