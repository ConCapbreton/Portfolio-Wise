import { useLocation } from 'react-router-dom'
import { useState, useEffect } from "react"

import HamburgerMenu from './HamburgerMenu'
import UserSettingsIcon from './UserSettingsIcon'
import NavButtons from './NavButtons'

const NavBar = () => {
  const url = useLocation()
  const [navDiv, setNavDiv] = useState("nav-div")
  const [centerLogo, setCenterLogo] = useState("header-logo")

  useEffect(() => {
    if (url.pathname === "/" || url.pathname === "/loginsignup") {
      setNavDiv("no-nav-div")
      setCenterLogo("center-header-logo")
    }
  }, [])

  return (
    <div id="header-div">
      <img tabIndex="0" id={centerLogo} src="/PortfoliowiseLogo.webp" alt="Portfolio Wise Logo" width="40" height="40"/>
      <div id={navDiv}>
        <NavButtons />
        <HamburgerMenu />
        <UserSettingsIcon />
      </div>
    </div>
  )
}

export default NavBar
