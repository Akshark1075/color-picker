import React, {Component} from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Slide from '@material-ui/core/Slide';
import ColorBox from "./ColorBox";
import Navbar from './Navbar';
import "./Palette.css"



class Palette extends Component{
    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.handleSelectionChange=this.handleSelectionChange.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.state={
            level:500,
            format:"hex",open: false,
            Transition:Slide
        }
    }
handleChange(newLevel) {
    this.setState({level:newLevel})
}
handleSelectionChange(format) {
    this.setState({format,open:true})
}
handleClose(){
    this.setState({open:false})     
}
render(){
    const {paletteName,emoji}=this.props.paletteColors
    const colorBoxes=this.props.paletteColors.colors[this.state.level].map(bgcolor=>{
       return <ColorBox backgroundColor={bgcolor[this.state.format]}name={bgcolor.name} key={bgcolor.id}/>
    }
       )
    return (<div className="Palette">
        <Navbar level={this.state.level} handleChange={this.handleChange}handleSelectionChange={this.handleSelectionChange} />
        <div className="Palette-colors">
        {colorBoxes}
        </div>
        <Snackbar
  open={this.state.open}
  onClose={this.handleClose}
  TransitionComponent={this.state.Transition}
  message={`Format changed to ${this.state.format}`}
  key={this.state.Transition.name}
  autoHideDuration={3000}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
  action={
    <IconButton
    edge="start"
       color="inherit"
    aria-label="Close"
    onClick={this.handleClose}
  >
    <CloseIcon/>
  </IconButton>
  }
  />
  <footer className="footer">
{paletteName}
<span className="emoji">{emoji}</span>
  </footer>
    </div>)
}
}
export default Palette