import React from 'react';
import { DashboardSquare01Icon, CellsIcon, CheckmarkBadge04Icon, RankingIcon, Note04Icon, CancelCircleIcon } from 'hugeicons-react';
import Link from 'next/link';

const Sidebar = ({ menuList, setShowSideBar }) => {
  return (
    <>
      <div className='hidden lg:flex flex-col z-[99] w-[90vw] lg:w-[20vw] h-[100vh] bg-white py-10 items-center font-dosisMedium rounded-lg'>
        <p className='font-dosisBold text-3xl'>2K24</p>
        <div className='flex flex-col space-y-6 w-[75%] mt-10 justify-center'>
          {menuList?.map((ele, index) => {
            return (
              <SidebarMenuItem key={index} icon={ele?.icon} text={ele?.name} href={ele?.link} setShowSideBar={setShowSideBar} />
            )
          })}
        </div>
      </div>
    </>

  );
};

const MobileSideBar = ({ setShowSideBar, menuList }) => {
  return (
    <>
      <div className='flex flex-col z-[99] absolute top-2 bottom-2 left-2 right-2 bg-white rounded-lg items-center py-10'>
        <div className='flex flex-row w-full p-2 justify-end' >
          <CancelCircleIcon color='#000' className='cursor-pointer' onClick={() => setShowSideBar(false)} />
        </div>
        <p className='font-dosisBold text-3xl'>2K24</p>
        <div className='flex flex-col space-y-6 w-[75%] mt-10 justify-center'>
          {menuList?.map((ele, index) => {
            return (
              <SidebarMenuItem key={index} icon={ele?.icon} text={ele?.name} href={ele?.link} setShowSideBar={setShowSideBar} />
            )
          })}
        </div>
      </div>
    </>
  )
}

const SidebarMenuItem = ({ icon, text, href, setShowSideBar }) => {

  return (
    <>
      <div className='flex flex-row space-x-3 ' onClick={() => setShowSideBar(false)}>
        {icon}
        <Link href={href} >
          <p className='text-lg text-black'>{text}</p>
        </Link>
      </div>
    </>
  )
}

export { MobileSideBar }
export default Sidebar;
