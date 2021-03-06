import React from 'react'
function Footer(props){
    const {paletteName,emoji }= props
    return (

 <footer className="footer">
{paletteName}
<span className="emoji">{emoji}</span>
  </footer>
    )
}
export default Footer