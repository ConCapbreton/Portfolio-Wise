import "./PwButton.css"

// #login {}
// #signup {}
// #submit {}
// #createnewskill {}
// #edit {}
// #delete {}

const PwButton = ({buttonType, onclickFun, skillId}) => {
  let btnClassName = ""
  if (buttonType) {
    btnClassName = "pw-btn " + buttonType.toLowerCase().replaceAll(" ", "") 
  }

  let btnValue = ""
  if (skillId) {
    btnValue = skillId
  }
  
  return (
    <button value={btnValue} className={btnClassName}  onClick={ onclickFun }>{ buttonType }</button>
  )
}

export default PwButton
