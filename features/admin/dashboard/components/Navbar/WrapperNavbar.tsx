import { getCurrentUser } from '@/features/Auth/user_Info/service/user.service'
import DashboardNavbar from './Navbar'


export default async function WrapperNavbar() {
    const user = await getCurrentUser()

  return (
    <DashboardNavbar user={user} />
  )
}
