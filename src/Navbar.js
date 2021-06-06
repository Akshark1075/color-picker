import React, {Component  } from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";
import { Link } from "react-router-dom";
class Navbar extends Component{
    constructor(props){
        super(props);
        this.state={format:"hex"}
        this.handleSelectionChange=this.handleSelectionChange.bind(this)
    }
handleSelectionChange(evt){
    this.setState({format:evt.target.value})
    this.props.handleSelectionChange(evt.target.value)
}
render(){
    const {format} = this.state
    return(
        <nav className="Navbar">
            <div className="logo"><Link to="/">Shades</Link></div>
            {this.props.showingAllColors &&(<div className="SliderContainer">
                <span className="level">Level: {this.props.level}</span>
                <div className="slider">
                 <Slider min={100} max={900} step={100} defaultValue={this.props.level} onAfterChange={this.props.handleChange}/>
                  </div>
            </div>)}
            <div className="typeSelector">
                <Select value={format} onChange={this.handleSelectionChange}>
                    <MenuItem value="hex"> HEX </MenuItem>
                    <MenuItem value="rgb"> RGB </MenuItem>
                    <MenuItem value="rgba"> RGBA </MenuItem>
                </Select>
            </div>
        </nav>
    )
}
}
export default Navbar