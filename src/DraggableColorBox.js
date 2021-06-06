import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import {SortableElement} from 'react-sortable-hoc';
const styles={
    root:{
        width:"20%",
        height:"25%",
        margin: "0 auto",
        cursor: "pointer",
        position: "relative",
        display: "inlineBlock",
        marginBottom: "-5px",
        "&:hover svg":{
            color:"white",
            transform:"scale(1.5)"
        },
        "@media(max-width:576px)":{
        width:"100%",
        height:"5%",
        },
        "@media(min-width:576px)":{
            width:"50%",
            height:"10%",
        },
        "@media(min-width:768px)":{
            width:"25%",
            height:"20%",
        },
        "@media(min-width:992px)":{
            width:"20%",
            height:"25%", 
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
        alignItems:"baseline",
        "@media(max-width:576px)":{
            padding:"5px",
            },
    },
    deleteIcon:{
        color:"rgb(0,0,0,0.5)",
        
        transition:"all 0.5s ease-in-out"
    }
}
const DraggableColorBox=SortableElement((props)=>{
function handleDelete(name){
props.removeColor(name)
}
return <div className={props.classes.root} style={{backgroundColor: props.backgroundColor, display:"inline-block"}}>
   <div className={props.classes.boxContent}> <span>{props.name}</span>
   <DeleteIcon className={props.classes.deleteIcon} onClick={()=>handleDelete(props.name)}/>
   </div>
    </div>
}) 
export default withStyles(styles)(DraggableColorBox)