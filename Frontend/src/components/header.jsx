import React from 'react'
import './navibar.scss'
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import NotificationsSharpIcon from '@mui/icons-material/NotificationsSharp';
import LanguageSharpIcon from '@mui/icons-material/LanguageSharp';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuIcon from '@mui/icons-material/Menu';
const Header = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
      {/* <div className="search">
        <input type="text" placeholder="Search..." />
        <SearchSharpIcon/>
      </div> */}
      <div className='menuIcon'>
        <MenuIcon />
      </div>
      
      <div className='userInfo'>
        <p className='userName'>User Name</p>
        <p className='userRole'>User Role</p>
      </div>
    
      <div className="items">
        
        <div className="item">
        <NotificationsNoneRoundedIcon className="icon"/>
        
        </div>
        <div className="item">
        <LogoutRoundedIcon className="icon" />
        </div>
      </div>
      </div>
    </div>
  )
}

export default Header