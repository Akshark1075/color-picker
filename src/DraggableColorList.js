import React from 'react'
import DraggableColorBox from './DraggableColorBox'
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
function DraggableColorList(props){
   
    return <div>
        {props.colors.map((color)=>{return <DraggableColorBox key={color.name} name={color.name} backgroundColor={color.color} handleClick={()=>{props.removeColor(color.name)}}/>} )}
        </div>
    } 
    export default DraggableColorList