import { useState, useEffect } from 'react'
import { useAuthContext } from '../../context/authContext'

const Footer = () => {
  const {accessToken, decodeToken} = useAuthContext()
  const [footer, setFooter] = useState({username: "", role: ""})
  
  useEffect(() => {
    const {username, status} = decodeToken(accessToken)
    const displayRole = status === "Admin" ? status : ""
  
    if (username !== "") {
      setFooter({
        username: username,
        role: displayRole,
      })
    }
  }, [accessToken])

  return (
    <div id="footer-div">
      <p>{footer.username}</p>
      <p>{footer.role}</p>
      <p>&#169;Portfolio Wise {new Date().getFullYear()}</p>
    </div>
  )
}

export default Footer