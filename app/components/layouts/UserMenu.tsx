import { Button, Menu, MenuItem } from '@mui/material'
import { useLocation } from '@remix-run/react'
import { useState } from 'react'
import { RootUser } from '~/utils/types'

interface UserMenuProps {
  isDesktop: boolean
  user: RootUser | null
  logout: () => void
}

const UserMenu = ({ isDesktop, user, logout }: UserMenuProps) => {
  const location = useLocation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isActive = (link: string) => location.pathname === link
  const rightMenu = [
    {
      name: 'Profile',
      url: '/profile',
    },
    {
      name: 'Logout',
      func: logout,
    },
  ]

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <>
      {user && (
        <>
          <Button color="inherit" sx={{ marginLeft: '10px' }} onClick={handleClick}>
            {user.username}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              '& .MuiMenu-paper': {
                width: isDesktop ? 'auto' : '100vw', // Desktop: auto, Mobile: full width
                minWidth: '200px', // Minimum width for both
                left: isDesktop ? 'unset' : 0, // Align left for mobile
              },
            }}
          >
            {rightMenu.map((menu) => (
              <MenuItem
                key={menu.name}
                onClick={
                  menu.func
                    ? (e) => {
                        menu.func()
                        handleClose()
                      }
                    : handleClose
                }
                sx={{
                  bgcolor: isActive(menu.url || '') ? 'rgba(0, 0, 0, 0.08)' : 'inherit', // Highlight active link
                  textAlign: isDesktop ? 'left' : 'center', // Center text for mobile
                }}
              >
                {menu.name}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </>
  )
}

export default UserMenu
