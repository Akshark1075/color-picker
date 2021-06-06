import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
const styles = {
    root: {
        backgroundColor:"White",
        borderRadius:"5px",
        padding: "0.5rem",
        overflow:"none",
        position:"relative",
        border: "2px solid black",
        cursor:"pointer",
        "&:hover svg":{
           
           opacity:"1",
        }
    },
    colors:{
        backgroundColor:"grey",
      width:"100%",
      height:"100px",
      borderRadius:"5px",
 
    },
    color:{
        height:"25%",
        width:"20%",
        position:"relative",
        margin:"0 auto",
        display:"inline-block",
        marginBottom:"-4px",
        
        
    },
    
    title:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        margin:"0",
        position:"relative",
        paddingTop:"0.5 rem",
        color:"black",
        fontSize:"1 rem"
    },
    emoji:{
        marginLeft:"0.5rem",
        fontSize:"1.5rem"
    }, 
    
    deleteIcon:{
        color:"white",
        backgroundColor:"#eb3d30",
        width:"20px",
        height:"20px",
        position:"absolute",
        top:"0px",
        right:"0px",
        padding:"10px",
        zIndex:"100",
       opacity:"0",
        
            }
    

}

function Minipalette (props){
    const {classes, paletteName, emoji,id,colors}=props
let paletteColors=colors.map(x=><div className={classes.color} style={{"backgroundColor":x.color}}key={x.name}></div>)
function handleDelete(evt){

props.deletePalette(evt,id)
}
    return(<div className={classes.root} onClick={props.handleClick}>
        
        <DeleteIcon className={classes.deleteIcon} style={{transition:"all 0.5s ease-in-out"}} onClick={handleDelete}/>
      
       
        <div className={classes.colors}>{paletteColors}</div> 
        <h5 className={classes.title}>{paletteName } <span className={classes.emoji}> {emoji} </span></h5>
    </div>)
}
export default withStyles(styles) (Minipalette)