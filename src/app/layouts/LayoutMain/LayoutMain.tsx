import { LayoutFooter, LayoutHeader } from '@/app/layouts'
import { Outlet } from 'react-router'

type Props = {}

export const LayoutMain = (props: Props) => {
  return (
    <>
      <LayoutHeader />
      <Outlet />
      <LayoutFooter />
    </>
  )
}
