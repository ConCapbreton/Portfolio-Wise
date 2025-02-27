import { useState } from "react"
import { Drawer } from 'antd'
import { useNavigate } from "react-router-dom"

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const showDrawer = () => {
    setOpen(true)
  }

  const navPort = () => {
    navigate(`/portfolio`)
    setOpen(false)
  }
  
  const navUsers = () => {
    navigate(`/userlist`)
    setOpen(false)
  }

  const onClose = () => {
    setOpen(false)
  }
  
  return (
    <div>
      <svg onClick={showDrawer} tabIndex="0" className="header-icon" id="hamburger-menu" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>
      <Drawer title="Navigation" onClose={onClose} open={open}>
        <div id="ham-btn-div">
          <button id="ham-btn" onClick={navPort}>My Portfolio</button>
          <button id="ham-btn" onClick={navUsers}>User List</button>
        </div>
      </Drawer>
    </div>
  )
}

export default HamburgerMenu
