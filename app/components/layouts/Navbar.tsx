// Navbar.tsx
import { useEffect, useState } from 'react'
import { RootUser } from '~/utils/types'
import MyAppBar from './MyAppBar'

interface NavbarProps {
  setOpen: (newOpen: boolean) => void
  drawerWidth: number
}

const Navbar = ({ setOpen, drawerWidth }: NavbarProps) => {
  const [user, setUser] = useState<RootUser | null>(null)

  useEffect(() => {
    const auth = window.localStorage.getItem('user')
    if (auth && auth !== 'null') setUser(JSON.parse(auth))

    if (!auth || auth === 'null') {
      const fetchUserData = async () => {
        const response = await fetch('/api/session')
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        }
      }
      fetchUserData()
    }

    setTimeout(() => {
      setUser({
        jwt: 'xxxx',
        user: {
          username: 'xxxx',
          email: 'xxxx',
          provider: 'xxxx',
          confirmed: true,
          blocked: false,
          createdAt: 'xxxx',
          updatedAt: 'xxxx',
          id: 1,
        },
      })
    }, 1000)
  }, [])

  useEffect(() => {
    if (user) window.localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  const logout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
    // fetcher.submit(null, { method: 'post', action: '/logout' })
    console.log('logout')
  }

  return <MyAppBar setOpen={setOpen} drawerWidth={drawerWidth} userData={user} logout={logout} />
}

export default Navbar
