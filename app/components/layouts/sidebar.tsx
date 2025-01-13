import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import { Box, Collapse, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery } from '@mui/material'
import { Link, useLocation } from '@remix-run/react'
import React, { useEffect, useState } from 'react'

const menu = [
  {
    url: '/',
    name: 'Home',
    subMenu: [
      {
        url: '/docs',
        name: 'สร้างเอกสาร',
      },
      {
        url: '/all-docs',
        name: 'เอกสารที่สร้างไว้',
      },
    ],
  },
  {
    url: '/about',
    name: 'About',
  },
]

export default function Sidebar({
  setOpen,
  open,
  drawerWidth = 250,
}: {
  setOpen: (newOpen: boolean) => void
  open: boolean
  drawerWidth: number
}) {
  const isScreen = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const location = useLocation()
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const handleClick = (name: string) => {
    setOpenMenu(openMenu === name ? null : name)
  }

  const isActive = (url: string | undefined) => {
    return url && location.pathname === url
  }

  useEffect(() => {
    menu.forEach((item) => {
      if (item.subMenu) {
        const activeSubMenu = item.subMenu.some((subItem) => isActive(subItem.url))
        if (activeSubMenu) setOpenMenu(item.name)
      }
    })
  }, [location.pathname])

  const DrawerList = (
    <Box sx={{ width: drawerWidth }} role="presentation">
      <List>
        {menu.map((item) => (
          <React.Fragment key={item.name}>
            {item.subMenu ? (
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleClick(item.name)}
                  sx={{ bgcolor: isActive(item.url) ? 'rgba(161, 41, 41, 0.08)' : 'inherit', color: 'rgba(0, 0, 0, 0.87)' }}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                  {openMenu === item.name ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>
              </ListItem>
            ) : (
              <Link to={item.url} style={{ textDecoration: 'none' }}>
                <ListItem disablePadding sx={{ bgcolor: isActive(item.url) ? 'rgba(161, 41, 41, 0.08)' : 'inherit' }}>
                  <ListItemButton sx={{ color: 'rgba(0, 0, 0, 0.87)' }}>
                    <ListItemIcon sx={{ color: 'rgba(0, 0, 0, 0.87)' }}>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            )}
            <Collapse in={openMenu === item.name} timeout="auto" unmountOnExit>
              <List disablePadding>
                {item.subMenu &&
                  item.subMenu.map((subItem) => (
                    <React.Fragment key={subItem.name}>
                      {subItem.url ? (
                        <Link to={subItem.url} style={{ textDecoration: 'none' }}>
                          <ListItem disablePadding sx={{ bgcolor: isActive(subItem.url) ? 'rgba(161, 41, 41, 0.08)' : 'inherit' }}>
                            <ListItemButton sx={{ color: 'rgba(0, 0, 0, 0.87)' }}>
                              <ListItemText inset primary={subItem.name} />
                            </ListItemButton>
                          </ListItem>
                        </Link>
                      ) : (
                        <ListItem disablePadding>
                          <ListItemButton sx={{ color: 'rgba(0, 0, 0, 0.87)' }} onClick={subItem.func}>
                            <ListItemText inset primary={subItem.name} />
                          </ListItemButton>
                        </ListItem>
                      )}
                    </React.Fragment>
                  ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
      <Divider />
    </Box>
  )

  return (
    <Drawer
      open={open && !isScreen}
      onClose={toggleDrawer(false)}
      variant={isScreen ? 'permanent' : 'temporary'}
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      {DrawerList}
    </Drawer>
  )
}
