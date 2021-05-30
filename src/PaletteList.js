import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import MiniPalette from './MiniPalette'
import { withStyles } from '@material-ui/core/styles';
const styles={
    root:{
        backgroundColor:"blue",
        width:"100%",
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"flex-start"


    },
    container:{
        width:"50%",
        display:"flex",
        flexDirection:"column",
        alignItems:"flex-start",
        flexWrap:"wrap"
    },
    nav:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        color:"White",
        width:"100%",
        "& a":{
            color:"White"
        },
    },
    palettes:{
        boxSizing:"border-box",
        width:"100%",
        display:"grid",
        gridTemplateColumns:" 30% 30% 30%",
        gridGap:"5%"

    }
}
class PaletteList extends Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this)
        this.handleDelete=this.handleDelete.bind(this)
    }
 handleClick(id){
this.props.history.push(`palette/${id}`)
 }  
 handleDelete(evt,id){
       
     evt.stopPropagation()
     this.props.deletePalette(id)

 }
render(){
 
    const {palettes, classes}=this.props
    let allpalettes=palettes.map(x=><MiniPalette {...x} handleClick={()=>this.handleClick(x.id)} key={x.id} deletePalette={this.handleDelete} />)
    return(<div className={classes.root}>
        <div className={classes.container}>
        <nav className={classes.nav}><h1>React Colors</h1>
        <Link to="/palette/new">Create Palette</Link>
        </nav>
        <div className={classes.palettes}>{allpalettes}</div>
        
        </div>
        </div>)
}
}
export default withStyles(styles)(PaletteList)