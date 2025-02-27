import { useNavigate } from "react-router-dom"

const NavButtons = () => {
  const navigate = useNavigate()

  const navPort = () => {
    navigate(`/portfolio`)
  }

  const navUsers = () => {
    navigate(`/userlist`)
  }

  return (
    <div id="nav-btn-div">
      <button className="nav-btns" onClick={navPort}>My Portfolio</button>
      <button className="nav-btns" onClick={navUsers}>User List</button>
    </div>
  )
}

export default NavButtons