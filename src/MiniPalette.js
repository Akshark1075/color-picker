import React from 'react'
import { withStyles } from '@material-ui/core/styles';
const styles = {
    root: {
        backgroundColor:"White",
        borderRadius:"5px",
        padding: "0.5rem",
        overflow:"none",
        position:"relative",
        border: "2px solid black",
        "&:hover":{
            cursor:"pointer"
           
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
    }

}

function Minipalette (props){
    const {classes, paletteName, emoji, colors}=props
let paletteColors=colors.map(x=><div className={classes.color} style={{"backgroundColor":x.color}}key={x.name}></div>)
    return(<div className={classes.root} onClick={props.handleClick}>
        <div className={classes.colors}>{paletteColors}</div>
        <h5 className={classes.title}>{paletteName } <span className={classes.emoji}> {emoji} </span></h5>
    </div>)
}
export default withStyles(styles) (Minipalette)