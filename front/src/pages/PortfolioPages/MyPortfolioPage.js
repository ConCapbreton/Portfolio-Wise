import "./PortfolioPage.css"
import NavBar from "../../components/HeaderFooter/NavBar.js"
import Footer from "../../components/HeaderFooter/Footer.js"
import PwButton from "../../components/PwButton/PwButton.js" 
import SkillModal from "../../components/Skills/SkillModal.js"
import EditSkillModal from "../../components/Skills/EditSkillModal.js"
import DeleteSkillModal from "../../components/Skills/DeleteSkillModal.js"
import { useState, useEffect  } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../context/authContext.js"
import { getSkills } from "../../services/api/skillsService.js"

const PortfolioPage = () => {
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [skills, setSkills] = useState([])
  const [skillsRender, setSkillsRender] = useState([])
  const [oneSkill, setOneSkill] = useState("")
  const [skillMsg, setSkillMsg] = useState("")
  const { accessToken, checkLogin, decodeToken } = useAuthContext()
  const navigate = useNavigate()
  
  useEffect(() => {
    const pageLoadLoginCheck = async () => {
      const isLoggedIn = await checkLogin(accessToken)
      if (isLoggedIn.success) {
        const { id } = decodeToken(isLoggedIn.accessToken)
        if (!id) {
          navigate('/')
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
    const {username} = decodeToken(accessToken)
    setSkillsRender([<p>No skills were found for {username}. Why not create a new one?</p>])
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
        <div id="btn-div">
          <PwButton skillId={skill._id} buttonType={"Edit"} onclickFun={onEditClick}/>
          <PwButton skillId={skill._id} buttonType={"Delete"} onclickFun={onDeleteClick}/>
        </div>
      </div>
    )
  })
  setSkillsRender(skillList)
 }, [skills])

  const onEditClick = (event) => {
    const skill = skills.find(skill => skill._id === event.target.value)
    setOneSkill(skill)
    setOpenEdit(true)
  }

  const onDeleteClick = (event) => {
    const skill = skills.find(skill => skill._id === event.target.value)
    setOneSkill(skill)
    setOpenDelete(true)
  }

  return (
    <>
      <NavBar />
      <div className="page">
        <h1>My Portfolio Page</h1>
        <PwButton buttonType={"Create new skill"} onclickFun={() => setOpen(true)}/>
        <p id="skill-msg">{skillMsg}</p>
        <div className="skill-div">{skillsRender}</div>
      </div>
      <SkillModal open={open} setOpen={setOpen} setSkills={setSkills} setSkillMsg={setSkillMsg}/>
      <EditSkillModal openEdit={openEdit} setOpenEdit={setOpenEdit} skills={skills} setSkills={setSkills} oneSkill={oneSkill} setSkillMsg={setSkillMsg}/>
      <DeleteSkillModal openDelete={openDelete} setOpenDelete={setOpenDelete} skills={skills} setSkills={setSkills} oneSkill={oneSkill} setSkillMsg={setSkillMsg}/>
      <Footer />
    </>
  )
}

export default PortfolioPage
