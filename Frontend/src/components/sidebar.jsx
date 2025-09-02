import React from 'react';
import { DashboardSquare01Icon, CellsIcon, CheckmarkBadge04Icon, RankingIcon, Note04Icon, CancelCircleIcon } from 'hugeicons-react';
import Link from 'next/link';

const Sidebar = ({ menuList, setShowSideBar }) => {
  return (
    <>
      <div className='hidden lg:flex flex-col z-[99] w-[90vw] lg:w-[20vw] h-[100vh] bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 border border-cyan-400/30 shadow-[0_0_30px_rgba(6,182,212,0.3)] backdrop-blur-sm py-10 items-center font-dosisMedium rounded-lg '>
        <p className='font-dosisBold text-3xl text-cyan-100 tracking-widest'>2K25</p>
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
      <div className='fixed inset-0 z-[100] flex flex-col bg-gradient-to-b from-slate-900/80 via-purple-900/80 to-slate-900/80 border-0 shadow-[0_0_30px_rgba(6,182,212,0.3)] backdrop-blur-sm overflow-y-auto'>
        <div className='flex flex-row justify-center items-center p-4 w-full relative'>
          <p className='font-dosisBold text-3xl text-cyan-100 tracking-widest'>2K25</p>
          <div className='absolute right-4'>
            <CancelCircleIcon color='#06b6d4' size={28} className='cursor-pointer hover:text-cyan-300 transition-colors duration-200' onClick={() => setShowSideBar(false)} />
          </div>
        </div>
        <div className='flex flex-col items-center px-6 pb-6'>
          <div className='flex flex-col space-y-1 w-full max-w-sm mt-6'>
            {menuList?.map((ele, index) => {
              return (
                <SidebarMenuItem key={index} icon={ele?.icon} text={ele?.name} href={ele?.link} setShowSideBar={setShowSideBar} />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

const SidebarMenuItem = ({ icon, text, href, setShowSideBar }) => {

  return (
    <>
      <Link href={href} className='w-full' onClick={() => setShowSideBar && setShowSideBar(false)}>
        <div className='flex flex-row space-x-3 hover:bg-cyan-400/10 active:bg-cyan-400/20 p-3 md:p-0.5  rounded-lg transition-all duration-200 cursor-pointer w-full'>
          {React.cloneElement(icon, { className: "text-cyan-300 hover:text-cyan-100 transition-colors duration-200", size: 24 })}
          <p className='text-lg text-cyan-100 hover:text-white transition-colors duration-200 tracking-wide'>{text}</p>
        </div>
      </Link>
    </>
  )
}

export { MobileSideBar }
export default Sidebar;