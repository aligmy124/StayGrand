import { getCurrentUser } from '@/features/Auth/user_Info/service/user.service'
import DashboardNavbar from './Navbar'


export default async function WrapperNavbar() {
    const user = await getCurrentUser()
    console.log("Admin: ", user)
  return (
    <DashboardNavbar user={user} />
  )
}
