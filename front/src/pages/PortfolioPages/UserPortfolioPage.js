import "./PortfolioPage.css"
import NavBar from "../../components/HeaderFooter/NavBar.js"
import Footer from "../../components/HeaderFooter/Footer.js"
import { useState, useEffect } from "react"
import { useAuthContext } from "../../context/authContext.js"
import { getSkills } from "../../services/api/skillsService.js"
import { useNavigate, useParams } from "react-router-dom"

const UserPortfolioPage = () => {
    const {checkLogin, accessToken} = useAuthContext()
    const [skills, setSkills] = useState([])
    const [skillsRender, setSkillsRender] = useState()
    const navigate = useNavigate()
    const { id, username } = useParams()

    useEffect(() => {
      const pageLoadLoginCheck = async () => {
        const isLoggedIn = await checkLogin(accessToken)
        if (isLoggedIn.success) {
          if (!id) {
            navigate('/userslist')
            return
          }
          const response = await getSkills(id, isLoggedIn.accessToken)
          if (response.success) {
            setSkills(response.response)
          } else {
            setSkills([])
          }
        } else {
          navigate('/')
        }
      }
      pageLoadLoginCheck()
    }, [])

    useEffect(() => {
      if (!skills?.length) {
        setSkillsRender([<p>No skills were found for {username}.</p>])
        return
      }
      const reversedSkills = skills.toReversed()
      const skillList = reversedSkills.map((skill) => {
        return (
          <div id={skill._id} key={skill._id} className="skill-card">
            <img src={skill.image ? skill.image : "/PortfoliowiseLogo.webp"} alt={"Image for " + skill.title} width="150" height="150"/>
            <p><strong>Skill Title: </strong>{skill.title}</p>
            <p><strong>Category: </strong>{skill.category}</p>
            <p><strong>Level: </strong>{skill.level}</p>
          </div>
        )
      })
      setSkillsRender(skillList)
    }, [skills])

  return (
    <>
      <NavBar />
      <div className="page">
        <h1>{username}'s portfolio page</h1>
        <div className="skill-div">{skillsRender}</div>
      </div>
      <Footer />
    </>
  )
}

export default UserPortfolioPage