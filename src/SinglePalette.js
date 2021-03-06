import React, {Component} from 'react'
import ColorBox from './ColorBox'
import Navbar from './Navbar'
import Slide from '@material-ui/core/Slide';
import Footer from './Footer'
import {Link} from 'react-router-dom'
class SinglePalette extends Component{
    constructor(props){
        super(props)
        this.shades=this.generateShades(this.props.palette,this.props.colorId)
        this.state={
            
            format:"hex",open: false,
            Transition:Slide
        }
        this.handleSelectionChange=this.handleSelectionChange.bind(this);
        this.handleClose=this.handleClose.bind(this);
    }
    generateShades(palette,colorToFilterBy){
        const allColors=palette.colors
        let shades=[]
        for (let key in allColors){
            shades=shades.concat(allColors[key].filter(color=>color.id===colorToFilterBy))
        }
        return shades.slice(1)
    }
    handleSelectionChange(format) {
        this.setState({format,open:true})
    }
    handleClose(){
        this.setState({open:false})     
    }
    render(){
    return(
        <div className="SingleColorPalette Palette">
            <Navbar handleSelectionChange={this.handleSelectionChange} showingAllColors={false}/>
            <div className="Palette-colors">
        {this.shades.map(x=><ColorBox backgroundColor={x[this.state.format]}name={x['name']} key={x['name']} showLink={false}/>)}
        <div className="ColorBox goBack"><Link to={`/palette/${this.props.palette.id}`} className="back-button">Go Back</Link></div>
        </div>
        <Footer emoji= {this.props.palette.emoji} paletteName={this.props.palette.paletteName}/>
        </div>
        )
    
    }
}
export default SinglePalette