import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography, useMediaQuery } from '@mui/material'
import { useFetcher, useLocation } from '@remix-run/react'
import { useEffect, useState } from 'react'
import type { RootUser } from '~/utils/types'

const leftMenu = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'About',
    link: '/about',
  },
  {
    name: 'Contact',
    link: '/contact',
  },
  {
    name: 'Services',
    link: '/services',
  },
]

function MyAppBar({
  setOpen,
  drawerWidth = 250,
  userData = null,
}: {
  setOpen: (newOpen: boolean) => void
  drawerWidth: number
  userData: RootUser | null
}) {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const location = useLocation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const fetcher = useFetcher()
  const { user } = userData || {}

  const rightMenu = [
    {
      func: () => {
        fetcher.submit(null, { method: 'post', action: '/logout' })
        console.log('logout')
      },
      name: 'Logout',
    },
  ]
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const isActive = (link) => location.pathname === link

  return (
    <AppBar
      position="static"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          {!isDesktop && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography component="div" sx={{ flexGrow: 1 }}>
            {leftMenu.slice(0, 1).map((menu) => (
              <Button
                key={menu.name}
                color="inherit"
                href={menu.link}
                sx={{ bgcolor: isActive(menu.link) ? 'rgba(0, 0, 0, 0.08)' : 'inherit' }}
              >
                {menu.name}
              </Button>
            ))}
            {isDesktop &&
              leftMenu.slice(1).map((menu) => (
                <Button
                  key={menu.name}
                  color="inherit"
                  href={menu.link}
                  sx={{ bgcolor: isActive(menu.link) ? 'rgba(0, 0, 0, 0.08)' : 'inherit' }}
                >
                  {menu.name}
                </Button>
              ))}
            {!isDesktop && (
              <>
                <Button color="inherit" onClick={handleClick} sx={{ marginLeft: '10px' }}>
                  More
                </Button>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                  {leftMenu.slice(1).map((menu) => (
                    <MenuItem
                      key={menu.name}
                      onClick={handleClose}
                      component="a"
                      href={menu.link}
                      sx={{ bgcolor: isActive(menu.link) ? 'rgba(0, 0, 0, 0.08)' : 'inherit', width: '100vw', left: 0 }}
                    >
                      {menu.name}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Typography>
          {user && (
            <Button color="inherit" sx={{ marginLeft: '10px' }} href="/profile">
              {user.username}
            </Button>
          )}

          {user &&
            rightMenu.map((menu) => (
              <Button key={menu.name} color="inherit" onClick={menu.func}>
                {menu.name}
              </Button>
            ))}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

function Navbar({ setOpen, drawerWidth = 250 }: { setOpen: (newOpen: boolean) => void; drawerWidth: number }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch('/api/session')
      if (response.ok) {
        const userData = await response.json()
        console.log(userData)
        setUser(userData)
      }
    }
    fetchUserData()
  }, [])
  return <MyAppBar setOpen={setOpen} drawerWidth={drawerWidth} userData={user} />
}

export default Navbar
