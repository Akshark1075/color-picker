import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const styles={
    root:{
        width:"20%",
        height:"25%",
        margin: "0 auto",
        cursor: "pointer",
        position: "relative",
        display: "inlineBlock",
        marginBottom: "-4px",
        "&:hover svg":{
            color:"white",
            transform:"scale(1.5)"
        }
    },
    boxContent:{
        bottom:"0px",
        left: "0px",
        padding: "10px",
        fontSize: "12px",
        letterSpacing: "1",
        position: "absolute",
        color: "black",
        textTransform: "uppercase",
        width:"100%",
        display:"flex",  
        justifyContent:"space-between",
        alignItems:"baseline"
    },
    deleteIcon:{
        color:"rgb(0,0,0,0.5)",
        
        transition:"all 0.5s ease-in-out"
    }
}
function DraggableColorBox(props){
function handleDelete(evt){
console.log(evt)
}
return <div className={props.classes.root} style={{backgroundColor: props.backgroundColor, display:"inline-block"}}>
   <div className={props.classes.boxContent}> <span>{props.backgroundColor}</span>
   <DeleteIcon className={props.classes.deleteIcon} onClick={handleDelete}/>
   </div>
    </div>
} 
export default withStyles(styles)(DraggableColorBox)