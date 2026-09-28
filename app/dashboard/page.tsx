import Dashboard from '@/features/admin/dashboard/components/Dashboard'
import { DashboardSkeleton } from '@/Shared/Components/DashboardSkeleton'
import { Suspense } from 'react'

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton/>}>
    <Dashboard />
    </Suspense>
  )
}
