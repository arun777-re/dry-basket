'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'
import { ROUTES } from '@/constants/routes'
import authHook from '@/hooks/authHook'
import { RootState } from '@/redux/store/store'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const Logout = () => {
  const { LOGOUT_USER } = authHook()
  const router = useRouter()
  const user = useSelector((state: RootState) => state.user.user.data)
  const [loading, setLoading] = React.useState(false)

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!user?.email) {
      toast.error('User not found')
      return
    }
    setLoading(true)
    const res = await LOGOUT_USER()
    setLoading(false)
    if (res?.payload?.success) {
      toast.success('Logout successful')
      router.push(ROUTES.HOME)
    } else {
      toast.error(res?.payload?.message || 'Logout failed')
    }
  }

  return (
    <TabsContent value="settings">
      <Card  className='border-none'>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? 'Logging out...' : 'Logout'}
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  )
}

export default Logout
