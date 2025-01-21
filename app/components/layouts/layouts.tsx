import { Container } from '@mui/material'
import { useState } from 'react'

import Navbar from '~/components/layouts/narbar'
import Sidebar from '~/components/layouts/sidebar'
import ClientOnly from '~/utils/ClientOnly'

const drawerWidth = 250

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <ClientOnly>
        <Navbar setOpen={setOpen} drawerWidth={drawerWidth} />
      </ClientOnly>
      <ClientOnly>
        <Sidebar setOpen={setOpen} open={open} drawerWidth={drawerWidth} />
      </ClientOnly>
      <Container
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          mt: 2,
        }}
      >
        {children}
      </Container>
    </div>
  )
}
