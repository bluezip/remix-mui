import { Button, Menu, MenuItem } from '@mui/material'
import { Link, useLocation } from '@remix-run/react'
import { useState } from 'react'
import type { RootUser } from '~/utils/types'

interface UserMenuProps {
  isDesktop: boolean
  userData: RootUser | null
  logout: () => void
}

const UserMenu = ({ isDesktop, userData, logout }: UserMenuProps) => {
  const location = useLocation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isActive = (link: string) => location.pathname === link
  const user = userData && userData.user
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
                component={Link}
                to={menu.url || ''}
                key={menu.name}
                onClick={
                  menu.func
                    ? () => {
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
