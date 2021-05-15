import React from 'react'
import DraggableColorBox from './DraggableColorBox'
import {SortableContainer} from 'react-sortable-hoc';

function DraggableColorList(props){
   
    return <div style={{height:"100%", width:"100%"}}>
        {props.colors.map((color,i)=>{return <DraggableColorBox key={color.name} name={color.name} index={i} backgroundColor={color.color} removeColor={props.removeColor}/>} )}
        </div>
    } 
    export default SortableContainer(DraggableColorList)