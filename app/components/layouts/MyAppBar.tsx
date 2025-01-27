// MyAppBar.tsx
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Container, IconButton, Toolbar, Typography, useMediaQuery } from '@mui/material'
import type { RootUser } from '~/utils/types'
import LeftMenu from './LeftMenu'
import UserMenu from './UserMenu'

interface MyAppBarProps {
  setOpen: (newOpen: boolean) => void
  drawerWidth: number
  userData: RootUser | null
  logout: () => void
}

const MyAppBar = ({ setOpen, drawerWidth, userData, logout }: MyAppBarProps) => {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('sm'))

  return (
    <AppBar position="static" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}>
      <Container maxWidth="xl">
        <Toolbar>
          {!isDesktop && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography component="div" sx={{ flexGrow: 1 }}>
            <LeftMenu isDesktop={isDesktop} />
          </Typography>
          {userData && <UserMenu isDesktop={isDesktop} userData={userData} logout={logout} />}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default MyAppBar
