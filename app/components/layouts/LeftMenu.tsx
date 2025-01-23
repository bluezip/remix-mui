// LeftMenu.tsx
import { Button, Menu, MenuItem } from '@mui/material'
import { useLocation } from '@remix-run/react'
import { useState } from 'react'

const leftMenu = [
  { name: 'Home', link: '/' },
  { name: 'About', link: '/about' },
  { name: 'Contact', link: '/contact' },
  { name: 'Services', link: '/services' },
]

interface LeftMenuProps {
  isDesktop: boolean
}

const LeftMenu = ({ isDesktop }: LeftMenuProps) => {
  const location = useLocation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const isActive = (link: string) => location.pathname === link

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <>
      {leftMenu.slice(0, 1).map((menu) => (
        <Button key={menu.name} color="inherit" href={menu.link} sx={{ bgcolor: isActive(menu.link) ? 'rgba(0, 0, 0, 0.08)' : 'inherit' }}>
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
    </>
  )
}

export default LeftMenu
