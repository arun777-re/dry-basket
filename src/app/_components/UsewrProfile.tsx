import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'
import React from 'react'
import { RootState } from '@/redux/store/store'
import { useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes'

const UsewrProfile = () => {
    const router = useRouter();

    const user = useSelector((state:RootState)=>state.user.user.data);
    const updatePassword = (e:React.MouseEvent<HTMLButtonElement>)=>{
router.push(`${ROUTES.UPDATE_PASSWORD}`)
    }
    
  return (
      <TabsContent value="profile" className=' bg-gradient-to-br from-first via-first/80 to-first/60 rounded-xl'>
                <Card  className='border-none'>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{user?.firstName}&nbsp;{user?.lastName}</p>
                    <p>{user?.email}</p>
                    <Button className="mt-4 cursor-pointer" onClick={updatePassword}>Update Password</Button>
                  </CardContent>
                </Card>
              </TabsContent>
  )
}

export default UsewrProfile